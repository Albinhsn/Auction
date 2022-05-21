﻿using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class GetPostageProducer
    {
        IModel _channel;
        private readonly BlockingCollection<String> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;

        public GetPostageProducer(RabbitMQConnection connection)
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


        public int GetPostage(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(
                exchange: "",
                routingKey: "getPostage",
                basicProperties: props,
                body: messageBytes
                );

            string s = respQueue.Take();
            Console.WriteLine(s);
            return int.Parse(s);
        }

    }
}
