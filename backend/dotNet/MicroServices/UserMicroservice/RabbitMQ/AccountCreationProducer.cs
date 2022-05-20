using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class AccountCreationProducer
    {
        IModel _channel;
        public AccountCreationProducer()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountCreated",                                                            
                    type: ExchangeType.Fanout
                    );
                
                
            }
        }
        public void sendAccountCreatedMessage(User user)
        {       
            
            string message = JsonSerializer.Serialize<User>(user);
            var body = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("Sent in User");
            _channel.BasicPublish(
                         exchange: "accountCreated",
                         routingKey: "",
                         basicProperties: null,
                         body: body
                     );
            
        }
    }
}
