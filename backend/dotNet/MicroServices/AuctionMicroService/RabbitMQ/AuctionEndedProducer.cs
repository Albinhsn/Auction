using AuctionMicroService.Models;
using AuctionMicroService.Services;
using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class AuctionEndedProducer
    {
        IModel _channel;
        IModel _bidChannel;
        AuctionService _auctionService;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();     
        private readonly IBasicProperties props;
        public AuctionEndedProducer(AuctionService auctionService, RabbitMQConnection connection)
        {
            _auctionService = auctionService;
            
            _channel = connection._connection.CreateModel();
            {
                _channel.QueueDeclare(
                    queue: "auctionEndedBids",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
            }

            _bidChannel = connection._connection.CreateModel();
            var queueName = _bidChannel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_bidChannel);



            props  = _bidChannel.CreateBasicProperties();
            var allAuctionHighestBidCorrelationId = Guid.NewGuid().ToString();
            props.CorrelationId = allAuctionHighestBidCorrelationId;
            props.ReplyTo = queueName;

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                Console.WriteLine("received back again");
                if (ea.BasicProperties.CorrelationId == allAuctionHighestBidCorrelationId)
                {
                    respQueue.Add(response);


                }

            };
            _bidChannel.BasicConsume(
                consumer: consumer,
                queue: queueName,
                autoAck: true
                );
        }
       
        public void AuctionEnded(string Id)
        {            
           
            HighestBid highestBid = getHighestBidFromAuction(Id);                        
            EmailAuction auc = new EmailAuction();
            Auction auction = _auctionService.GetAuction(Id).Result;
            auc.AuctionName = auction.Name;
            auc.Price = highestBid.Amount;
            auc.UserId = highestBid.UserId;
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<EmailAuction>(auc));
            _channel.BasicPublish(
                exchange: "",
                routingKey: "auctionEndedEmail",
                basicProperties: null,
                body: body
                );
        }
        public HighestBid getHighestBidFromAuction(string Id)
        {
            
            var body = Encoding.UTF8.GetBytes(Id);
            _bidChannel.BasicPublish(
                exchange: "",
                routingKey: "auctionEndedBids",
                basicProperties: null,
                body: body
                );
            string s = respQueue.Take();
            return JsonSerializer.Deserialize<HighestBid>(s);
        }
    }
}
