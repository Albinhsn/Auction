using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using TagsMicroService.Models;
using TagsMicroService.Services;

namespace TagsMicroService.RabbitMQ
{
    public class AuctionCreatedReceiver
    {
        IModel _channel;
        TagsService _service;
        public AuctionCreatedReceiver(TagsService service, RabbitMQConnection connection)
        {
            _service = service;
            _channel = connection._connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "auctionCreated",
                    type: ExchangeType.Fanout
                    );
                var queueName = _channel.QueueDeclare().QueueName;
                _channel.QueueBind(
                    queue: queueName,
                    exchange: "auctionCreated",
                    routingKey: ""
                    );
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine("Received in Tags");
                    AuctionCreated(message);

                };
                _channel.BasicConsume(
                    queue: queueName,
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        public void AuctionCreated(string message)
        {
            Console.WriteLine(message);
            Auction auc = JsonSerializer.Deserialize<Auction>(message);            
            Tag tags = auc.Tags;
            tags.Id = auc.Id;
            _service.AuctionCreated(tags);
        }
    }
}


