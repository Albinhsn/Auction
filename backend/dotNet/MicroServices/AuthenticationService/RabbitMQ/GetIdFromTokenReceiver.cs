using AuthenticationService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace AuthenticationService.RabbitMQ
{
    public class GetIdFromTokenReceiver
    {
        IModel _channel;
        UserAuthenticationService _authenticationService;
        public GetIdFromTokenReceiver(UserAuthenticationService authenticationService, RabbitMQConnection connection)
        {
            
            _authenticationService = authenticationService; 
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "getIdFromToken",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                    );
                _channel.BasicQos(0, 1, false);
                var consumer = new EventingBasicConsumer(_channel);
                _channel.BasicConsume(
                    queue: "getIdFromToken",
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
                        
                        response = _authenticationService.AuthenticateJWT(message);
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
