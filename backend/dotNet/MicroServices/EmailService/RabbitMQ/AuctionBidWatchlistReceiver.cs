using EmailService.Models;
using EmailService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class AuctionBidWatchlistReceiver
    {
        IModel _channel;
        EmailsService _emailService;
        public AuctionBidWatchlistReceiver(EmailsService service, RabbitMQConnection connection)
        {
            Console.WriteLine("Created AuctionPurchasedWatchlistReceiver");
            _emailService = service;
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionBidEmailWatchlist",
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
                    AuctionBidWatchlist(message);

                };
                _channel.BasicConsume(
                    queue: "auctionBidEmailWatchlist",
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }

        public void AuctionBidWatchlist(string message)
        {
            List<Auction> auctions = JsonSerializer.Deserialize<List<Auction>>(message);

            _emailService.sendBidWatchlistEmails(auctions);
        }
    }
}

