using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;
using UserMicroservice.Services;

namespace UserMicroservice.RabbitMQ
{
    public class GetUsernameFromListOfIdsReceiver
    {
        IModel _channel;
        UserService _userService;
        public GetUsernameFromListOfIdsReceiver(UserService userService, RabbitMQConnection connection)
        {
            _userService = userService;            
            {
                _channel = connection._connection.CreateModel();
                {
                    _channel.QueueDeclare(
                        queue: "getUsernameFromListOfIds",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                        );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "getUsernameFromListOfIds",
                        autoAck: false,
                        consumer: consumer
                        );

                    consumer.Received += (model, ea) =>
                    {
                        string response = null;

                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _channel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;
                        Console.WriteLine("GOT");
                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            List<string> Ids = JsonSerializer.Deserialize<List<string>>(message);
                            response = JsonSerializer.Serialize<List<User>>(_userService.GetUsernameFromListOfIds(Ids).Result);
                            Console.WriteLine(response);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                        finally
                        {
                            Console.WriteLine("Sending back");
                            var responseBytes = Encoding.UTF8.GetBytes(response);
                            _channel.BasicPublish(
                                exchange: "",
                                routingKey: props.ReplyTo,
                                basicProperties: replyProps,
                                body: responseBytes
                                );
                            _channel.BasicAck(
                                deliveryTag: ea.DeliveryTag,
                                multiple: false
                                );
                        }

                    };


                }
            }
        }
    }
}
