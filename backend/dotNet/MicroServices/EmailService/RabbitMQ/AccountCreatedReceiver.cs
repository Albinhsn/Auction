using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text.Json;
using EmailService.Models;
using System.Text;
using EmailService.Services;

namespace EmailService.RabbitMQ
{
    public class AccountCreatedReceiver
    {
        IModel _channel;
        EmailsService _emailService;
        public AccountCreatedReceiver(EmailsService emailService, RabbitMQConnection connection)
        {
            _emailService = emailService;
          
            _channel = connection._connection.CreateModel();
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

            User result = JsonSerializer.Deserialize<User>(message);
            Models.User user = new();
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
