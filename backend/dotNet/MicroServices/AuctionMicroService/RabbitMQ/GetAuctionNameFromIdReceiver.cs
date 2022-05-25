using AuctionMicroService.Models;
using AuctionMicroService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace AuctionMicroService.RabbitMQ
{
    public class GetAuctionNameFromIdReceiver
    {

        IModel _channel;
        
        public GetAuctionNameFromIdReceiver(AuctionService service, RabbitMQConnection connection)
        {
            
            
            {
                _channel = connection._connection.CreateModel();
                {
                    _channel.QueueDeclare(
                        queue: "auctionNameFromId",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                        );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "auctionNameFromId",
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
                            response = service.GetAuctionNameFromId(message).Result;
                        }
                        catch (Exception ex)
                        {

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
