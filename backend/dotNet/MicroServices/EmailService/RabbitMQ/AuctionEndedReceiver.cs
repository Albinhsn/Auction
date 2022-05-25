using BidMicroService.Models;
using EmailService.Models;
using EmailService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class AuctionEndedReceiver
    {

        EmailsService _emailService;
        IModel _channel;
        public AuctionEndedReceiver(EmailsService emailService)
        {
            _emailService = emailService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionEnded",
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
                    queue: "auctionEnded",
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        public void auctionEnded(string message)
        {
            List<Auction> aucs = JsonSerializer.Deserialize<List<Auction>>(message);
            _emailService.sendWinnerSellerEmail(aucs);
            
        }
    }
}
