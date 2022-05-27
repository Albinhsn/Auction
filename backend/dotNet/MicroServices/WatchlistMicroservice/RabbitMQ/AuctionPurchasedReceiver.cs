using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using WatchlistMicroservice.Services;

namespace WatchlistMicroservice.RabbitMQ
{
    public class AuctionPurchasedReceiver
    {

        IModel _channel;
        
        public AuctionPurchasedReceiver(WatchlistService watchlistService, RabbitMQConnection connection)
        {
            
            {
                _channel = connection._connection.CreateModel();
                
                {
                    _channel.QueueDeclare(
                        queue: "auctionPurchasedWatchlist",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                        );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "auctionPurchasedWatchlist",
                        autoAck: false,
                        consumer: consumer
                        );

                    consumer.Received += (model, ea) =>
                    {
                        string response = null;

                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _channel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            response = JsonSerializer.Serialize<List<string>>(watchlistService.GetReminderIdsByAuction(message).Result);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex);
                        }
                        finally
                        {
                            var responseBytes = Encoding.UTF8.GetBytes(response);
                            _channel.BasicPublish(
                                exchange: "",
                                routingKey: props.ReplyTo,
                                basicProperties: replyProps,
                                body: responseBytes
                                );
                            _channel.BasicAck(
                                deliveryTag: ea.DeliveryTag,
                                multiple: false
                                );
                        }

                    };


                }
            }
        }
    }
}
