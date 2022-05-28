using BidMicroService.Models;
using BidMicroService.Services;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class GetAllAuctionHighestBidReceiver
    {
        
        IModel _channel; 
        BidService _bidService;
        
        
        public GetAllAuctionHighestBidReceiver(BidService bidService, RabbitMQConnection connection)
        {
            _bidService = bidService;   
            

                _channel = connection._connection.CreateModel();
                {
                    _channel.QueueDeclare(
                       queue: "getAllAuctionHighestBid",
                       durable: false,
                       exclusive: false,
                       autoDelete: false,
                       arguments: null
                       );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "getAllAuctionHighestBid",
                        autoAck: false,
                        consumer: consumer
                        );

                    consumer.Received += (model, ea) =>
                    {
                        string allAuctionHighestBidResponse = "";
                        Console.WriteLine("Received");
                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _channel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            allAuctionHighestBidResponse = JsonSerializer.Serialize<List<HighestBid>>(_bidService.GetAllAuctionsHighestBid().Result);
                            
                            
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());   
                        }
                        finally
                        {
                            var responseBytes = Encoding.UTF8.GetBytes(allAuctionHighestBidResponse);
                            Console.WriteLine("Sending back");
                            
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
