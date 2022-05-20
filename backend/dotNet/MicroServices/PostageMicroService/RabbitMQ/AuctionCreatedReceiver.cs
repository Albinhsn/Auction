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
        public AuctionCreatedReceiver(PostageService postageService)
        {

            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
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
                    auctionCreated(message);

                };
                _channel.BasicConsume(
                    queue: queueName,
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }



        public void auctionCreated(string message)
        {
            //CreatedAuction auc = JsonSerializer.Deserialize<CreatedAuction>(message);
            //_postageService.CreatePostage(auc.AuctionId, auc.Weight, auc.Volume);
        }
    }
}
