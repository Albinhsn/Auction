using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class BidMadeWatchlistProducer
    {
        IModel _auctionChannel;
        IModel _watchlistChannel;
        IModel _emailChannel;
        private readonly BlockingCollection<String> aucRespQueue = new BlockingCollection<string>();
        private readonly BlockingCollection<String> watchlistRespQueue = new BlockingCollection<string>();
        private readonly IBasicProperties auctionProps;
        private readonly IBasicProperties watchlistProps;

        public BidMadeWatchlistProducer(RabbitMQConnection connection)
        {
            //Get auction name from id 
            _auctionChannel= connection._connection.CreateModel();
            var aucQueueName = _auctionChannel.QueueDeclare().QueueName;
            var aucConsumer = new EventingBasicConsumer(_auctionChannel);


            auctionProps = _auctionChannel.CreateBasicProperties();
            var aucCorrelationId = Guid.NewGuid().ToString();
            auctionProps.CorrelationId = aucCorrelationId;
            auctionProps.ReplyTo = aucQueueName;


            aucConsumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == aucCorrelationId)
                {

                    aucRespQueue.Add(response);

                }
            };


            _auctionChannel.BasicConsume(
                consumer: aucConsumer,
                queue: aucQueueName,
                autoAck: true
                );


            //Get watchlist users 
            _watchlistChannel = connection._connection.CreateModel();
            var watchlistQueueName = _watchlistChannel.QueueDeclare().QueueName;
            var watchlistConsumer = new EventingBasicConsumer(_watchlistChannel);


            watchlistProps = _watchlistChannel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            watchlistProps.CorrelationId = correlationId;
            watchlistProps.ReplyTo = watchlistQueueName;


            watchlistConsumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {

                    watchlistRespQueue.Add(response);

                }
            };


            _watchlistChannel.BasicConsume(
                consumer: watchlistConsumer,
                queue: watchlistQueueName,
                autoAck: true
                );

            //Send email
            _emailChannel = connection._connection.CreateModel();
            {
                {
                    _emailChannel.QueueDeclare(
                        queue: "auctionBidEmailWatchlist",
                        durable: false,
                        autoDelete: false,
                        arguments: null,
                        exclusive: false
                        );
                }
            }
        }

        public void BidMadeWatchlist(Bid bid)
        {

            
            var body = Encoding.UTF8.GetBytes(bid.AuctionId);
            _watchlistChannel.BasicPublish(
                exchange: "",
                routingKey: "auctionPurchasedWatchlist",
                basicProperties: watchlistProps,
                body: body
                );
            string s = watchlistRespQueue.Take();
            
            
            List<string> watchlistIds = JsonSerializer.Deserialize<List<string>>(s);
            if (watchlistIds.Count > 0)
            {
                

                body = Encoding.UTF8.GetBytes(bid.AuctionId);
                _auctionChannel.BasicPublish(
                    exchange: "",
                    routingKey: "auctionNameFromId",
                    basicProperties: auctionProps,
                    body: body
                    );
                string auctionName = aucRespQueue.Take();
                

                List<EmailAuction> emailAuctions = new();
                foreach (var id in watchlistIds)
                {
                    EmailAuction a = new();
                    a.AuctionName = auctionName;
                    a.UserId = id;
                    a.Price = bid.Amount;
                    emailAuctions.Add(a);
                }
                body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<List<EmailAuction>>(emailAuctions));


                
                _emailChannel.BasicPublish(
                       exchange: "",
                       routingKey: "auctionBidEmailWatchlist",
                       basicProperties: null,
                       body: body
                       );
            }
            
        }
    }
}
