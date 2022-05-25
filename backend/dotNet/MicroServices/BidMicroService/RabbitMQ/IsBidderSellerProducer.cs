using BidMicroService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace BidMicroService.RabbitMQ
{
    public class IsBidderSellerProducer
    {
        IModel _channel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;

        public IsBidderSellerProducer(RabbitMQConnection connection)
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
                    
                }
            };


            _channel.BasicConsume(
                consumer: consumer,
                queue: queueName,
                autoAck: true
                );
        }


        public bool IsBidderSeller(Bid bid)
        {
            
            var messageBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize<Bid>(bid));
            _channel.BasicPublish(
                exchange: "",
                routingKey: "isBidderSeller",
                basicProperties: props,
                body: messageBytes
                );

            string s = respQueue.Take();
            

            return JsonSerializer.Deserialize<bool>(s);
        }

    }
}

