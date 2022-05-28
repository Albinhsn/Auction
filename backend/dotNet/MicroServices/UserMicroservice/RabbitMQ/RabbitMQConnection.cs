using RabbitMQ.Client;

namespace UserMicroservice.RabbitMQ
{
    public class RabbitMQConnection
    {
        public IConnection _connection;
        public RabbitMQConnection()
        {
            var factory = new ConnectionFactory() { };
            factory.HostName = "rabbitmq";
            factory.UserName = "guest";
            factory.Password = "guest";
            factory.VirtualHost = "/";
            factory.Port = 5672;
            _connection = factory.CreateConnection();
        }
    }
}
