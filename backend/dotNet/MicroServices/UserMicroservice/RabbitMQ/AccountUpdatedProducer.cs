using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class AccountUpdatedProducer
    {
        IModel _channel;
        public AccountUpdatedProducer(RabbitMQConnection connection)
        {            
            _channel = connection._connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                   exchange: "accountUpdated",
                   type: ExchangeType.Fanout                                                         
                   );
            }
        }
        public void sendAccountUpdatedMessage(User user)
        {
            AuthUser a = new();
            a.Id = user.Id;
            a.Email = user.Email;
            
            string message = JsonSerializer.Serialize(a);
            
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                         exchange: "accountUpdated",
                         routingKey: "",
                         basicProperties: null,
                         body: body
                     );
        }
    }
}
