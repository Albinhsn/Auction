using AuthenticationService.Models;
using AuthenticationService.Services;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace AuthenticationService.RabbitMQ
{
    public class AccountUpdatedReceiver
    {

        
        
        IModel _channel;
        UserAuthenticationService _userAuthenticationService;
        public AccountUpdatedReceiver(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
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
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    accountUpdated(message);

                };
                _channel.BasicConsume(
                    queue: "accountUpdated",
                    autoAck: true,
                    consumer: consumer
                    );
            }


           
        }
        
        
    
        public void accountUpdated(string message)
        {
            UserStringId? result = JsonSerializer.Deserialize<UserStringId>(message);
            User user = new(result.Id, result.Email, result.Password);
            try
            {
                _userAuthenticationService.UpdateUser(user);
            }catch (Exception ex)
            {

            }
        }
    }
}
