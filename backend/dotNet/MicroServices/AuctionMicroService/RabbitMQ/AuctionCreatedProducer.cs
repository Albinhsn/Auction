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
        public void AuctionCreated(AuctionPostModel auc)
        {

            string message = JsonSerializer.Serialize<AuctionPostModel>(auc);
            var body = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("Sent in Auction");
            _channel.BasicPublish(
                         exchange: "auctionCreated",
                         routingKey: "",
                         basicProperties: null,
                         body: body
                     );

        }
    }
}
