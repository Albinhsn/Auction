using BidMicroService.Controllers;
using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class HigestBidFromListOfIdsReceiver
    {
        IModel _channel;
        BidService _bidService;
        public HigestBidFromListOfIdsReceiver(BidService bidService)
        {
            _bidService = bidService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                       queue: "getHighestBidFromListOfIds",
                       durable: false,
                       exclusive: false,
                       autoDelete: false,
                       arguments: null
                       );
                _channel.BasicQos(0, 1, false);
                var consumer = new EventingBasicConsumer(_channel);
                _channel.BasicConsume(
                    queue: "getHighestBidFromListOfIds",
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

                    try
                    {
                        Console.WriteLine("received");
                        var message = Encoding.UTF8.GetString(body);
                        List<string> Ids = JsonSerializer.Deserialize<List<string>>(message);
                        Console.WriteLine(Ids);
                        response = JsonSerializer.Serialize<List<HighestBid>>(_bidService.GetHighestBidFromListOfIds(Ids).Result);
                    }
                    catch (Exception ex)
                    {

                    }
                    finally
                    {
                        Console.WriteLine("Sending back");
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
