using RabbitMQ.Client;
using System.Text;

namespace AuctionMicroService.RabbitMQ
{
    public class AuctionEndedProducer
    {
        IModel _channel;
        public AuctionEndedProducer()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionEndedBids",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
            }
        }
       
        public void AuctionEnded(string Id)
        {            
            var body = Encoding.UTF8.GetBytes(Id);
            _channel.BasicPublish(
                exchange: "",
                routingKey: "auctionEndedBids",
                basicProperties: null,
                body: body
                );
        }
    }
}
