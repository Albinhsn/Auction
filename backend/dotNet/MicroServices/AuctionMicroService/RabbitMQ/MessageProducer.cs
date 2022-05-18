using AuctionMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;

namespace AuctionMicroService.RabbitMQ
{
    public class MessageProducer
    {
        IModel _getAuctionCreationChannel;
        IModel _getImagesFromAuctionChannel;
        IModel _madePurchaseChannel;
        IModel _auctionEndedChannel;

        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;
        public MessageProducer()
        {            
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _getAuctionCreationChannel = connection.CreateModel();
            {
                _getAuctionCreationChannel.QueueDeclare(
                    queue: "getAuction",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );
            }


            _madePurchaseChannel = connection.CreateModel();
            {
                _madePurchaseChannel.QueueDeclare(
                    queue: "madePurchase",
                    durable: false,
                    autoDelete: false,
                    arguments: null,    
                    exclusive : false   
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
            _getImagesFromAuctionChannel = connection.CreateModel();
            var replyQueueName = _getImagesFromAuctionChannel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_getImagesFromAuctionChannel);
            props = _getImagesFromAuctionChannel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;    
            props.ReplyTo = replyQueueName;


            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {
                    respQueue.Add(response);
                }
            };


            _getImagesFromAuctionChannel.BasicConsume(
                consumer: consumer,
                queue: replyQueueName,
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

        public string Call(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            _getImagesFromAuctionChannel.BasicPublish(
                exchange: "",
                routingKey: "getImagesFromAuction",
                basicProperties: props,
                body: messageBytes
                );

            return respQueue.Take();
        }
    }
}
