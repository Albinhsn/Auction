using EmailService.Models;
using EmailService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EmailService.RabbitMQ
{
    public class AuctionPurchasedWatchlistReceiver
    {
        IModel _channel;
        EmailsService _emailService;
        public AuctionPurchasedWatchlistReceiver(EmailsService service, RabbitMQConnection connection)
         {
            Console.WriteLine("Created AuctionPurchasedWatchlistReceiver");
                _emailService = service;
                _channel = connection._connection.CreateModel();
                {
                    _channel.QueueDeclare(
                        queue: "auctionPurchasedEmailWatchlist",
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
                        purchasedAuctionWatchlist(message);

                    };
                    _channel.BasicConsume(
                        queue: "auctionPurchasedEmailWatchlist",
                        autoAck: true,
                        consumer: consumer
                        );

                }
        }

        public void purchasedAuctionWatchlist(string message)
        {
            List<Auction> auctions = JsonSerializer.Deserialize<List<Auction>>(message);
            
            _emailService.sendPurchasedWatchlistEmails(auctions);
        }
    }
}
