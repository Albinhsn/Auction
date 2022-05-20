using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text.Json;
using UserMicroservice.Models;
using EmailService.Models;
using System.Text;

namespace EmailService.RabbitMQ
{
    public class AccountCreatedReceiver
    {
        IModel _channel;
        EmailsService _emailService;
        public AccountCreatedReceiver(EmailsService emailService)
        {
            _emailService = emailService;
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
                    Console.WriteLine("Received in Email");
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

            UserMicroservice.Models.User result = JsonSerializer.Deserialize<UserMicroservice.Models.User>(message);
            EmailService.Models.User user = new();
            user.Email = result.Email;
            
            try
            {


                _emailService.CreateUser(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("result has no id");
            }
        }
    }
}
