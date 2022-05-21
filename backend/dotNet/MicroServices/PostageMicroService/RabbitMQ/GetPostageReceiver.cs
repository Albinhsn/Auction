using PostageMicroService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace PostageMicroService.RabbitMQ
{
    public class GetPostageReceiver
    {
        public GetPostageReceiver(PostageService service, RabbitMQConnection connection)
        {
            IModel _channel;                                                                                      
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "getPostage",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                    );
                _channel.BasicQos(0, 1, false);
                var consumer = new EventingBasicConsumer(_channel);
                _channel.BasicConsume(
                    queue: "getPostage",
                    autoAck: false,
                    consumer: consumer
                    );

                consumer.Received += (model, ea) =>
                {
                    string response = null;
                    Console.WriteLine("Received");
                    var body = ea.Body.ToArray();
                    var props = ea.BasicProperties;
                    var replyProps = _channel.CreateBasicProperties();
                    replyProps.CorrelationId = props.CorrelationId;

                    try
                    {
                        var message = Encoding.UTF8.GetString(body);
                        response = service.GetPostagePrice(message).Result.ToString();
                        Console.WriteLine(response);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }
                    finally
                    {
                        Console.WriteLine("Returning");
                        Console.WriteLine(response);
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
    

