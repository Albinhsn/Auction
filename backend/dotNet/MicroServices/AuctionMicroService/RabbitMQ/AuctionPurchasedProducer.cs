using AuctionMicroService.Models;
using AuctionMicroService.Services;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class AuctionPurchasedProducer
    {
        IModel _purchasedChannel;
        IModel _watchlistChannel;
        IModel _emailChannel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;

        public AuctionPurchasedProducer(RabbitMQConnection connection)
        {


            _purchasedChannel = connection._connection.CreateModel();
            {
                {
                    _purchasedChannel.QueueDeclare(
                        queue: "auctionPurchased",
                        durable: false,
                        autoDelete: false,
                        arguments: null,
                        exclusive: false
                        );
                }
            }
            _watchlistChannel = connection._connection.CreateModel();
            var queueName = _watchlistChannel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_watchlistChannel);


            props = _watchlistChannel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;
            props.ReplyTo = queueName;


            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {

                    respQueue.Add(response);

                }
            };


            _watchlistChannel.BasicConsume(
                consumer: consumer,
                queue: queueName,
                autoAck: true
                );
        


            

            _emailChannel = connection._connection.CreateModel();
            {
                {
                    _emailChannel.QueueDeclare(
                        queue: "auctionPurchasedEmailWatchlist",
                        durable: false,
                        autoDelete: false,
                        arguments: null,
                        exclusive: false
                        );
                }
            }
        }

        public void AuctionPurchased(Auction auc)
        {

            List<EmailAuction> emailAucs = new();
            EmailAuction wonEmailAuc = new();            
            wonEmailAuc.AuctionName = auc.Name;
            wonEmailAuc.Price = auc.PurchasePrice;
            wonEmailAuc.UserId = auc.Winner;
            emailAucs.Add(wonEmailAuc);

            EmailAuction soldEmailAuc = new();
            soldEmailAuc.AuctionName = auc.Name;
            soldEmailAuc.Price = auc.PurchasePrice;
            soldEmailAuc.UserId = auc.Seller;
            emailAucs.Add(soldEmailAuc);



            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<List<EmailAuction>>(emailAucs));
            _purchasedChannel.BasicPublish(
                exchange: "",
                routingKey: "auctionPurchased",
                basicProperties: null,
                body: body
                );
            Console.WriteLine("Publishing to purchasedWatchlist");
            body = Encoding.UTF8.GetBytes(auc.Id);
            _watchlistChannel.BasicPublish(
                exchange: "",
                routingKey: "auctionPurchasedWatchlist",
                basicProperties: props,
                body: body
                );

            string s = respQueue.Take();
            List<string> watchlistUserIds = JsonSerializer.Deserialize<List<string>>(s);
            List<EmailAuction> watchlistEmails = new();
            Console.WriteLine("Got back from watchlist with " + s);
            foreach(var watchlistUserId in watchlistUserIds)
            {
                EmailAuction ea = new();
                ea.AuctionName = auc.Name;
                ea.Price = auc.PurchasePrice;
                ea.UserId = watchlistUserId;
                watchlistEmails.Add(ea);
            }
            if (watchlistEmails.Count > 0)
            {
                Console.WriteLine("Publishing to " + watchlistEmails.Count.ToString());
                body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<List<EmailAuction>>(watchlistEmails));
                _emailChannel.BasicPublish(
                    exchange: "",
                    routingKey: "auctionPurchasedEmailWatchlist",
                    basicProperties: null,
                    body: body
                    );

            }
            else
            {
                Console.WriteLine("None found");
            }

        }
       
    }
}
