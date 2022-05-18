using MongoDB.Bson;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UserMicroservice.Models;

namespace UserMicroservice.RabbitMQ
{
    public class MessageProducer
    {

        
        IModel _accountCreationChannel;
        IModel _accountInfoChangedChannel;
        IModel _accountDeletedChanel;
        public MessageProducer()
        {
            var factory = new ConnectionFactory() { HostName =  "localhost"};
            var connection = factory.CreateConnection();
            _accountCreationChannel = connection.CreateModel();
            {
                _accountCreationChannel.QueueDeclare(
                    queue: "accountCreated",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );                              
            }

            _accountInfoChangedChannel = connection.CreateModel();
            {
                _accountCreationChannel.QueueDeclare(
                   queue: "accountInfoChangedCreated",
                   durable: false,
                   autoDelete: true,
                   arguments: null,
                   exclusive: false
                   );
            }
            _accountDeletedChanel = connection.CreateModel();
            {
                _accountCreationChannel.QueueDeclare(
                   queue: "accountDeleted",
                   durable: false,
                   autoDelete: true,
                   arguments: null,
                   exclusive: false
                   );
            }
            _accountInfoChangedChannel = connection.CreateModel();
            {
                _accountInfoChangedChannel.QueueDeclare(
                    queue: "accountInfoChanged",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );
            }


        }
        public void sendAccountCreatedMessage(User user)
        {
            AuthUserStringId authUser = new();
            authUser.Email = user.Email;
            authUser.Id = user.Id.ToString();
            authUser.Password = user.Password;

            string message = JsonSerializer.Serialize(authUser);
            var body = Encoding.UTF8.GetBytes(message);
            _accountCreationChannel.BasicPublish(
                         exchange: "",
                         routingKey: "accountCreated",
                         basicProperties: null,
                         body: body
                     );
            Console.Write("{0} Sent with {1}", message, body);
        }

        public void sendAccountDeletedMessage(ObjectId Id)
        {
            string message = Id.ToString();
            var body = Encoding.UTF8.GetBytes(message);
            _accountDeletedChanel.BasicPublish(
                exchange: "",
                routingKey: "accountDeleted",
                basicProperties: null,
                body: body
                );
        }

        public void sendAccountUpdatedMessage(User user)
        {
            AuthUserStringId authUser = new();
            authUser.Email = user.Email;
            authUser.Id = user.Id.ToString();
            authUser.Password = user.Password;

            string message = JsonSerializer.Serialize(authUser);
            var body = Encoding.UTF8.GetBytes(message);
            _accountCreationChannel.BasicPublish(
                         exchange: "",
                         routingKey: "accountUpdated",
                         basicProperties: null,
                         body: body
                     );
        }
    }
}
