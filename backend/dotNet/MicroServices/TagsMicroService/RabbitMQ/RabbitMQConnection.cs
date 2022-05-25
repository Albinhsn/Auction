using RabbitMQ.Client;

namespace TagsMicroService.RabbitMQ
{
    public class RabbitMQConnection
    {
        public IConnection _connection;
        public RabbitMQConnection()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
        }
    }
}
