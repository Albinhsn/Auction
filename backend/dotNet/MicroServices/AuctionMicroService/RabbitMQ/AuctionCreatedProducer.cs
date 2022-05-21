using AuctionMicroService.Models;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class AuctionCreatedProducer
    {
        IModel _channel;
        public AuctionCreatedProducer(RabbitMQConnection connection)
        {
            
            _channel = connection._connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "auctionCreated",
                    type: ExchangeType.Fanout
                    );


            }
        }
        public void sendAuctionCreatedMessage(PostageAuction auction)
        {

            string message = JsonSerializer.Serialize<PostageAuction>(auction);
            var body = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("Sent in User");
            _channel.BasicPublish(
                         exchange: "auctionCreated",
                         routingKey: "",
                         basicProperties: null,
                         body: body
                     );

        }
    }
}
