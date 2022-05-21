using AuctionMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class GetLowestHighestBidFromListOfIds
    {
        IModel _channel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;
        public GetLowestHighestBidFromListOfIds(RabbitMQConnection connection)
        {
            
            _channel = connection._connection.CreateModel();
            var queueName = _channel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_channel);

            props = _channel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;
            props.ReplyTo = queueName;

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                Console.WriteLine("received back again");
                if (ea.BasicProperties.CorrelationId == correlationId)
                {
                    respQueue.Add(response);


                }

            };
            _channel.BasicConsume(
                consumer: consumer,
                queue: queueName,
                autoAck: true
                );

        }
        public List<HighestBid> GetLowestHighestBidsLimited(List<string> Ids)
        {
            Console.WriteLine("Publishing");
            var message = JsonSerializer.Serialize<List<string>>(Ids);
            var messageBytes = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                exchange: "",
                routingKey: "getLowestHighestBidsLimited",
                basicProperties: props,
                body: messageBytes
                );
            string s = respQueue.Take();

            if (s == null)
            {
                return null;
            }
            Console.WriteLine(s);
            return JsonSerializer.Deserialize<List<HighestBid>>(s);
        }
    }
}
