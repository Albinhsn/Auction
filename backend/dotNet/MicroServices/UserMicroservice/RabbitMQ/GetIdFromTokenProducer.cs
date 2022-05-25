using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;

namespace UserMicroservice.RabbitMQ
{
    public class GetIdFromTokenProducer
    {
        IModel _channel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;

        public GetIdFromTokenProducer(RabbitMQConnection connection)
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


        public string GetIdFromToken(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("Published");
            _channel.BasicPublish(
                exchange: "",
                routingKey: "getIdFromToken",
                basicProperties: props,
                body: messageBytes
                );
            Console.WriteLine("Returned");
            string s = respQueue.Take();
            Console.WriteLine(s);
            return s;
        }

    }
}
