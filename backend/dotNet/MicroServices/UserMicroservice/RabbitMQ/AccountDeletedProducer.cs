using MongoDB.Bson;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class AccountDeletedProducer
    {




        IModel _channel;
        public AccountDeletedProducer()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountDeleted",
                    type: ExchangeType.Fanout
                    );


            }
        }
        public void sendAccountDeletedMessage(User user)
        {

            string message = JsonSerializer.Serialize<User>(user);
            var body = Encoding.UTF8.GetBytes(message);
            Console.WriteLine("Sent in User deleted");
            _channel.BasicPublish(
                         exchange: "accountDeleted",
                         routingKey: "",
                         basicProperties: null,
                         body: body
                     );

        }


    }
}
