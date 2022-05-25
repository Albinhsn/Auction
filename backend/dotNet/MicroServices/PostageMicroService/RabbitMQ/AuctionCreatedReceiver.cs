using PostageMicroService.Models;
using PostageMicroService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace PostageMicroService.RabbitMQ
{
    public class AuctionCreatedReceiver
    {
        IModel _channel;
        PostageService _postageService;
        public AuctionCreatedReceiver(PostageService postageService, RabbitMQConnection connection)
        {
            _postageService = postageService;            
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
                    Console.WriteLine("Received in Postage");
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
            CreatedAuction auc = JsonSerializer.Deserialize<CreatedAuction>(message);
            Console.WriteLine(message);
            Console.WriteLine(auc.Id);
            Console.WriteLine(auc.Weight);
            Console.WriteLine(auc.Volume);
            _postageService.CreatePostage(auc.Id, auc.Weight, auc.Volume);
        }
    }
}
