using BidMicroService.Models;
using BidMicroService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class AuctionEndedReceiver
    {
        IModel _channel;
        IModel _channelEmail;
        BidService _bidService;
        public AuctionEndedReceiver(BidService bidService, RabbitMQConnection connection)
        {
            _bidService = bidService;            
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionEndedBids",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    auctionEnded(message);

                };
                _channel.BasicConsume(
                    queue: "auctionEndedBids",
                    autoAck: true,
                    consumer: consumer
                    );

            }
            _channelEmail = connection._connection.CreateModel();
            {
                _channelEmail.QueueDeclare(
                    queue: "auctionEndedEmail",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
            }

        }

        public void auctionEnded(string Id)
        {
            HighestBid? bid = _bidService.GetHighestBidOnAuction(Id).Result;
            if(bid != null)
            {
                sendAuctionEndedEmail(bid);
            }

            
        }
        public void sendAuctionEndedEmail(HighestBid bid)
        {
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<HighestBid>(bid));
            _channel.BasicPublish(
                exchange: "",
                routingKey: "auctionEndedBids",
                basicProperties: null,
                body: body
                );
        }
    }
}
