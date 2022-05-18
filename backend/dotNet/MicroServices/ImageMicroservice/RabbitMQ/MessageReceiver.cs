using ImageMicroservice.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace ImageMicroservice.RabbitMQ
{
    public class MessageReceiver
    {
        IModel _getImagesFromAuctionChannel;
        ImageService _imageService;
        public MessageReceiver(ImageService imageService)
        {
            _imageService = imageService;   
            var factory = new ConnectionFactory() { HostName = "localhost"};
            var connection = factory.CreateConnection();
            _getImagesFromAuctionChannel = connection.CreateModel();
            {
                _getImagesFromAuctionChannel.QueueDeclare(
                    queue: "getImagesFromAuction",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );
                _getImagesFromAuctionChannel.BasicQos(0, 1, false);
                var consumer = new EventingBasicConsumer(_getImagesFromAuctionChannel);
                _getImagesFromAuctionChannel.BasicConsume(
                    queue: "getImagesFromAuction",
                    autoAck: false,
                    consumer: consumer
                    );

                consumer.Received += (model, ea) =>
                {
                    string response = null;
                    var body = ea.Body.ToArray();
                    var props = ea.BasicProperties;
                    var replyProps = _getImagesFromAuctionChannel.CreateBasicProperties();
                    replyProps.CorrelationId = props.CorrelationId;
                    try
                    {
                        //Parse message
                        string id = Encoding.UTF8.GetString(body);                        
                        Console.WriteLine("Got" + id);
                            
                        response = _imageService.GetImagesFromAuctionId(id).ToString();
                    }catch(Exception ex)
                    {

                    }
                
                };
            }
        }
        

    }
}
