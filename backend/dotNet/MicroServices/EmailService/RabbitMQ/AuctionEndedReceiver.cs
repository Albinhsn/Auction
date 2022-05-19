using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class AuctionEndedReceiver
    {

        EmailService _emailService;
        IModel _channel;
        public AuctionEndedReceiver(EmailService emailService)
        {
            _emailService = emailService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "accountEndedBids",
                    durable: false,
                    autoDelete: true,
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
        }
        public void auctionEnded(string message)
        {
            HighestBid bid = JsonSerializer.Deserialize<HighestBid>(message);
        }
    }
}
