using AuctionMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class GetAuctionBySearchTagsProducer
    {
        IModel _channel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;

        public GetAuctionBySearchTagsProducer(RabbitMQConnection connection)
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
                if (ea.BasicProperties.CorrelationId == correlationId)
                {

                    respQueue.Add(response);
                    Console.WriteLine(response);
                }
            };


            _channel.BasicConsume(
                consumer: consumer,
                queue: queueName,
                autoAck: true
                );
        }


        public List<Tags> GetAuctionBySearchTags(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("published");
            _channel.BasicPublish(
                exchange: "",
                routingKey: "getAuctionBySearchTags",
                basicProperties: props,
                body: messageBytes
                );

            string s = respQueue.Take();
            Console.WriteLine(s);
            return JsonSerializer.Deserialize<List<Tags>>(s);
        }


    }
}
