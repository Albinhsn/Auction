using EmailService.Models;
using EmailService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class MadePurchaseReceiver
    {
        EmailsService _emailService;
        IModel _channel;
        public MadePurchaseReceiver(EmailsService emailService, RabbitMQConnection connection)
        {
            _emailService = emailService;            
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionPurchasedEmail",
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
                    purchasedAuction(message);

                };
                _channel.BasicConsume(
                    queue: "auctionPurchasedEmail",
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        public void purchasedAuction(string message)
        {
            Auction bid = JsonSerializer.Deserialize<Auction>(message);
            _emailService.sendPurchaseMadeEmail(bid);

        }
    }
}
