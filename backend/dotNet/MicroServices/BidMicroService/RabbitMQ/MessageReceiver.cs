using BidMicroService.Controllers;
using BidMicroService.Models;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class MessageReceiver
    {
        IModel _getAuctionBidsChannel;
        IModel _getAuctionsHighestBidChannel; 
        BidService _bidService;
        
        
        public MessageReceiver(BidService bidService)
        {
            _bidService = bidService;   
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            {                           
                _getAuctionBidsChannel = connection.CreateModel();
                {
                    _getAuctionBidsChannel.QueueDeclare(
                        queue: "getAuctionBids",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                        );
                    _getAuctionBidsChannel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_getAuctionBidsChannel);
                    _getAuctionBidsChannel.BasicConsume(
                        queue: "getAuctionBids",
                        autoAck: false,
                        consumer: consumer
                        );
                    
                    consumer.Received += (model, ea) =>
                    {
                        string response = null;
                        
                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _getAuctionBidsChannel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);                                                    
                            response = JsonSerializer.Serialize<List<Bid>>(_bidService.GetAllBidsByAuction(message));                            
                        }catch(Exception ex)
                        {

                        }
                        finally
                        {
                            var responseBytes = Encoding.UTF8.GetBytes(response);
                            _getAuctionBidsChannel.BasicPublish(
                                exchange: "",
                                routingKey: props.ReplyTo,
                                basicProperties: replyProps,
                                body: responseBytes
                                );
                            _getAuctionBidsChannel.BasicAck(
                                deliveryTag: ea.DeliveryTag,
                                multiple: false
                                );
                        }
                
                    };


                }

                _getAuctionsHighestBidChannel = connection.CreateModel();
                {
                    _getAuctionsHighestBidChannel.QueueDeclare(
                       queue: "getAllAuctionHighestBid",
                       durable: false,
                       exclusive: false,
                       autoDelete: false,
                       arguments: null
                       );
                    _getAuctionsHighestBidChannel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_getAuctionsHighestBidChannel);
                    _getAuctionsHighestBidChannel.BasicConsume(
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
                        var replyProps = _getAuctionsHighestBidChannel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            allAuctionHighestBidResponse = JsonSerializer.Serialize<List<HighestBid>>(_bidService.GetAllAuctionsHighestBid().Result);
                            
                            
                        }
                        catch (Exception ex)
                        {
                            
                        }
                        finally
                        {
                            var responseBytes = Encoding.UTF8.GetBytes(allAuctionHighestBidResponse);
                            Console.WriteLine("Sending back");
                            
                            _getAuctionsHighestBidChannel.BasicPublish(
                                exchange: "",
                                routingKey: props.ReplyTo,
                                basicProperties: replyProps,
                                body: responseBytes
                                );
                            _getAuctionsHighestBidChannel.BasicAck(
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
