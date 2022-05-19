using AuctionMicroService.Models;
using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class MessageProducer
    {
        IModel _getAuctionBidsChannel;
        IModel _getImagesFromAuctionChannel;
        IModel _getAllAuctionHighestBidChannel;
        IModel _madePurchaseChannel;
        IModel _auctionEndedChannel;

        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly BlockingCollection<String> allAuctionHighestBidRespQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;
        private readonly IBasicProperties allAuctionHighestBidProps;
        public MessageProducer()
        {            
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _madePurchaseChannel = connection.CreateModel();
            {
                _madePurchaseChannel.QueueDeclare(
                    queue: "madePurchase",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
            }

            _auctionEndedChannel = connection.CreateModel();
            {
                _madePurchaseChannel.QueueDeclare(
                    queue: "madePurchase",
                    durable: false,
                    autoDelete: false,
                    arguments: null,
                    exclusive: false
                    );
            }    
            



            _getAuctionBidsChannel = connection.CreateModel();
            var replyAuctionBidQueueName = _getAuctionBidsChannel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_getAuctionBidsChannel);


            props = _getAuctionBidsChannel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;    
            props.ReplyTo = replyAuctionBidQueueName;


            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {
                    
                    respQueue.Add(response);
                    Console.WriteLine(response);
                }
            };


            _getAuctionBidsChannel.BasicConsume(
                consumer: consumer,
                queue: replyAuctionBidQueueName,
                autoAck: true
                );
                  
            
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

        public void MadePurchase(Auction auction)
        {
            string message = "";
            var body = Encoding.UTF8.GetBytes(message);                        
            _madePurchaseChannel.BasicPublish(
                exchange: "",
                routingKey: "madePurchase",
                basicProperties: null,
                body: body
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

        public List<Bid> GetAuctionBids(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            
            _getAuctionBidsChannel.BasicPublish(
                exchange: "",
                routingKey: "getAuctionBids",
                basicProperties: props,
                body: messageBytes
                );

            string s = respQueue.Take();
            Console.WriteLine(s);
            return null;
        }


    }
}
