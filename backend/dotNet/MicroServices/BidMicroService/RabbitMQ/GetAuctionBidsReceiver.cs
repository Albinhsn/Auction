using BidMicroService.Controllers;
using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class GetAuctionBidsReceiver
    {
        IModel _getAuctionBidsChannel;
        BidService _bidService;
        public GetAuctionBidsReceiver(BidService bidService)
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
                        }
                        catch (Exception ex)
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
            }
        }
    }
}
