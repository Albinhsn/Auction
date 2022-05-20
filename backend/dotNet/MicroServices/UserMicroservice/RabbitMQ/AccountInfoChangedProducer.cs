using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class AccountInfoChangedProducer
    {
        IModel _channel;
        public AccountInfoChangedProducer()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();

            _channel = connection.CreateModel();
            {
                _channel.QueueDeclare(
                   queue: "accountUpdated",
                   durable: false,
                   autoDelete: true,
                   arguments: null,
                   exclusive: false
                   );
            }
        }
        public void sendAccountUpdatedMessage(User user)
        {            
            string message = JsonSerializer.Serialize<User>(user);
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                         exchange: "",
                         routingKey: "accountUpdated",
                         basicProperties: null,
                         body: body
                     );
        }
    }
}
