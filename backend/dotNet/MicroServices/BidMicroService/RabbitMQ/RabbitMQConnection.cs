using RabbitMQ.Client;

namespace BidMicroService.RabbitMQ
{
    public class RabbitMQConnection
    {
        public IConnection _connection;
        public RabbitMQConnection()
        {
            var factory = new ConnectionFactory()
            {
                HostName = "rabbitmq",
                Port = 5672
            };
            factory.UserName = "guest";
            factory.Password = "guest";
            _connection = factory.CreateConnection();
        }
    }
}
