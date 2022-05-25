using EmailService.Models;
using EmailService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class AuctionPurchasedReceiver
    {
        EmailsService _emailService;
        IModel _channel;
        public AuctionPurchasedReceiver(EmailsService emailService)
        {
            _emailService = emailService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionPurchased",
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
                    auctionPurchased(message);

                };
                _channel.BasicConsume(
                    queue: "auctionPurchased",
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        public void auctionPurchased(string message)
        {
            List<Auction> auc = JsonSerializer.Deserialize<List<Auction>>(message);
            _emailService.sendPurchaseMadeEmail(auc[0]);
            _emailService.sendSoldAuctionEmail(auc[1]);

        }
    }
}
