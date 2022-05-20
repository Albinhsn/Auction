using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class AllAuctionHighestBidProducer
    {
        IModel _getAllAuctionHighestBidChannel;
        private readonly BlockingCollection<String> allAuctionHighestBidRespQueue = new BlockingCollection<string>();
        private readonly IBasicProperties allAuctionHighestBidProps;
        public AllAuctionHighestBidProducer()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _getAllAuctionHighestBidChannel = connection.CreateModel();
            var replyAllAuctionHighestBidQueueName = _getAllAuctionHighestBidChannel.QueueDeclare().QueueName;
            var allAuctionHighestBidConsumer = new EventingBasicConsumer(_getAllAuctionHighestBidChannel);

            allAuctionHighestBidProps = _getAllAuctionHighestBidChannel.CreateBasicProperties();
            var allAuctionHighestBidCorrelationId = Guid.NewGuid().ToString();
            allAuctionHighestBidProps.CorrelationId = allAuctionHighestBidCorrelationId;
            allAuctionHighestBidProps.ReplyTo = replyAllAuctionHighestBidQueueName;

            allAuctionHighestBidConsumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                Console.WriteLine("received back again");
                if (ea.BasicProperties.CorrelationId == allAuctionHighestBidCorrelationId)
                {
                    allAuctionHighestBidRespQueue.Add(response);


                }

            };
            _getAllAuctionHighestBidChannel.BasicConsume(
                consumer: allAuctionHighestBidConsumer,
                queue: replyAllAuctionHighestBidQueueName,
                autoAck: true
                );

        }
        public List<HighestBid> GetAllAuctionBids()
        {
            Console.WriteLine("Publishing");
            var messageBytes = Encoding.UTF8.GetBytes("");
            _getAllAuctionHighestBidChannel.BasicPublish(
                exchange: "",
                routingKey: "getAllAuctionHighestBid",
                basicProperties: allAuctionHighestBidProps,
                body: messageBytes
                );
            string s = allAuctionHighestBidRespQueue.Take();

            if (s == null)
            {
                return null;
            }
            Console.WriteLine(s);
            return JsonSerializer.Deserialize<List<HighestBid>>(s);
        }
    }
}
