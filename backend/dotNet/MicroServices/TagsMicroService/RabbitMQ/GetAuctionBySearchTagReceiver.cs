using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using TagsMicroService.Models;
using TagsMicroService.Services;

namespace TagsMicroService.RabbitMQ
{
    public class GetAuctionBySearchTagReceiver
    {
        IModel _channel;
        TagsService _service;
        public GetAuctionBySearchTagReceiver(TagsService tagsService, RabbitMQConnection connection)
        {
            _service = tagsService;

            {
                _channel = connection._connection.CreateModel();
                {
                    _channel.QueueDeclare(
                        queue: "getAuctionBySearchTags",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                        );
                    _channel.BasicQos(0, 1, false);
                    var consumer = new EventingBasicConsumer(_channel);
                    _channel.BasicConsume(
                        queue: "getAuctionBySearchTags",
                        autoAck: false,
                        consumer: consumer
                        );

                    consumer.Received += (model, ea) =>
                    {
                        string response = null;
                        Console.WriteLine("Received");
                        var body = ea.Body.ToArray();
                        var props = ea.BasicProperties;
                        var replyProps = _channel.CreateBasicProperties();
                        replyProps.CorrelationId = props.CorrelationId;

                        try
                        {
                            var message = Encoding.UTF8.GetString(body);
                            response = JsonSerializer.Serialize<List<Tag>>(_service.GetAuctionBySearchTags(message).Result);
                            
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
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
