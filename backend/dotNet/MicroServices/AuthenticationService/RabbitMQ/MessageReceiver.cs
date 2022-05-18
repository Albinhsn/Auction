using AuthenticationService.Models;
using AuthenticationService.Services;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace AuthenticationService.RabbitMQ
{
    public class MessageReceiver
    {

        IModel _accountCreationChannel;
        IModel _accountDeletedChannel;
        IModel _accountUpdatedChannel;
        UserAuthenticationService _userAuthenticationService;
        public MessageReceiver(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
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
                var consumer = new EventingBasicConsumer(_accountCreationChannel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    accountCreated(message);
                    
                };
                _accountCreationChannel.BasicConsume(
                    queue: "accountCreated",
                    autoAck: true,
                    consumer: consumer
                    );
                
            }

            _accountUpdatedChannel = connection.CreateModel();
            {
                _accountUpdatedChannel.QueueDeclare(
                    queue: "accountUpdated",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );
                var consumer = new EventingBasicConsumer(_accountDeletedChannel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    accountUpdated(message);

                };
                _accountUpdatedChannel.BasicConsume(
                    queue: "accountUpdated",
                    autoAck: true,
                    consumer: consumer
                    );
            }


            _accountDeletedChannel = connection.CreateModel();
            {
                _accountDeletedChannel.QueueDeclare(
                    queue: "accountDeleted",
                    durable: false,
                    autoDelete: true,
                    arguments: null,
                    exclusive: false
                    );
                var consumer = new EventingBasicConsumer(_accountDeletedChannel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    accountDeleted(message);

                };
                _accountDeletedChannel.BasicConsume(
                    queue: "accountDeleted",
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        
        public async void accountCreated(string message)
        {
            Console.WriteLine(message); 
            
            UserStringId? result = JsonSerializer.Deserialize<UserStringId>(message);
            User user = new(new ObjectId(result.Id), result.Email, result.Password);
            try
            {
                
                
                _userAuthenticationService.CreateUser(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("result has no id");   
            }            
        }
        public void accountDeleted(string message)
        {
            try
            {
                Console.WriteLine(message);
                _userAuthenticationService.DeleteUser(message);
            }catch (Exception ex)
            {
                Console.WriteLine("Id wasn't found");
            }
        }
        public void accountUpdated(string message)
        {
            UserStringId? result = JsonSerializer.Deserialize<UserStringId>(message);
            User user = new(new ObjectId(result.Id), result.Email, result.Password);
            try
            {
                _userAuthenticationService.UpdateUser(user);
            }catch (Exception ex)
            {

            }
        }
    }
}
