using BidMicroService.Controllers;
using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class GetLowestHighestBidLimitedReceiver
    {
        IModel _channel;
        BidService _bidService;


        public GetLowestHighestBidLimitedReceiver(BidService bidService)
        {
            _bidService = bidService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            {

                _channel = connection.CreateModel();
                {
                    _channel.QueueDeclare(
                       queue: "getLowestHighestBidsLimited",
                       durable: false,
                       exclusive: false,
                       autoDelete: false,
                       arguments: null
                       );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "getLowestHighestBidsLimited",
                        autoAck: false,
                        consumer: consumer
                        );

                    consumer.Received += (model, ea) =>
                    {
                        string response = "";
                        Console.WriteLine("Received in lowestHighestBid");
                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _channel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            List<string> Ids = JsonSerializer.Deserialize<List<string>>(message);
                            response = JsonSerializer.Serialize<List<HighestBid>>(_bidService.GetLowestHighestBidFromListOfIds(Ids).Result);


                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                        finally
                        {
                            var responseBytes = Encoding.UTF8.GetBytes(response);
                            Console.WriteLine("Sending back from LowestHighestBid");
                            Console.WriteLine(response);
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
