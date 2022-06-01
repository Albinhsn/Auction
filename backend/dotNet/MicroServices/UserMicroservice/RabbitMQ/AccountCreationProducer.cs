using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class AccountCreationProducer
    {
        IModel _channel;
        public AccountCreationProducer(RabbitMQConnection connection)
        {            
            _channel = connection._connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountCreated",                                                            
                    type: ExchangeType.Fanout
                    );
                
                
            }
        }
        public void sendAccountCreatedMessage(AuthUser user)
        {       
            
            string message = JsonSerializer.Serialize<AuthUser>(user);
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
