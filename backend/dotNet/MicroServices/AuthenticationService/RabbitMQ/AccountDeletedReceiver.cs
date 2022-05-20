using AuthenticationService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace AuthenticationService.RabbitMQ
{
    public class AccountDeletedReceiver
    {
        IModel _channel;
        UserAuthenticationService _userAuthenticationService;
        public AccountDeletedReceiver(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountDeleted",
                    type: ExchangeType.Fanout
                    );
                var queueName = _channel.QueueDeclare().QueueName;
                _channel.QueueBind(
                    queue: queueName,
                    exchange: "accountDeleted",
                    routingKey: ""
                    );
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine("Received in Auth");
                    accountDeleted(message);

                };
                _channel.BasicConsume(
                    queue: queueName,
                    autoAck: true,
                    consumer: consumer
                    );

            
            }
        }
        public void accountDeleted(string message)
        {
            try
            {
                Console.WriteLine(message);
                _userAuthenticationService.DeleteUser(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Id wasn't found");
            }
        }
    }
}
