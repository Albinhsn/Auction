using AuthenticationService.Models;
using AuthenticationService.Services;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace AuthenticationService.RabbitMQ
{
    public class AccountCreatedReceiver
    {
        IModel _channel;
        UserAuthenticationService _userAuthenticationService;
        public AccountCreatedReceiver(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountCreated",
                    type: ExchangeType.Fanout                                                                                
                    );
                var queueName = _channel.QueueDeclare().QueueName;
                _channel.QueueBind(
                    queue: queueName,
                    exchange: "accountCreated",
                    routingKey: ""
                    );
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine("Received in Auth");
                    accountCreated(message);

                };
                _channel.BasicConsume(
                    queue: queueName,
                    autoAck: true,
                    consumer: consumer
                    );

            }
        }
        public async void accountCreated(string message)
        {
            Console.WriteLine(message);

            UserStringId? result = JsonSerializer.Deserialize<UserStringId>(message);
            User user = new(result.Id, result.Email, result.Password);
            try
            {


                _userAuthenticationService.CreateUser(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("result has no id");
            }
        }
    }
}
