using AuctionMicroService.Models;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class AllAuctionHighestBidProducer
    {
        IModel _channel;
        private readonly BlockingCollection<String> allAuctionHighestBidRespQueue = new BlockingCollection<string>();
        private readonly IBasicProperties allAuctionHighestBidProps;
        public AllAuctionHighestBidProducer(RabbitMQConnection connection)
        {
            
            _channel = connection._connection.CreateModel();
            var replyAllAuctionHighestBidQueueName = _channel.QueueDeclare().QueueName;
            var allAuctionHighestBidConsumer = new EventingBasicConsumer(_channel);

            allAuctionHighestBidProps = _channel.CreateBasicProperties();
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
            _channel.BasicConsume(
                consumer: allAuctionHighestBidConsumer,
                queue: replyAllAuctionHighestBidQueueName,
                autoAck: true
                );

        }
        public List<HighestBid> GetAllAuctionBids()
        {
            Console.WriteLine("Publishing");
            var messageBytes = Encoding.UTF8.GetBytes("");
            _channel.BasicPublish(
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
