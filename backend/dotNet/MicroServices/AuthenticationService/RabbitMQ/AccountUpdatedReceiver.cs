﻿using AuthenticationService.Models;
using AuthenticationService.Services;
using MongoDB.Bson;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace AuthenticationService.RabbitMQ
{
    public class AccountUpdatedReceiver
    {

        
        
        IModel _channel;
        UserAuthenticationService _userAuthenticationService;
        public AccountUpdatedReceiver(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnection();

            _channel = connection.CreateModel();
            {
                _channel.ExchangeDeclare(
                    exchange: "accountUpdated",
                    type: ExchangeType.Fanout
                    );

                var queueName = _channel.QueueDeclare().QueueName;
                _channel.QueueBind(
                    queue: queueName,
                    exchange: "accountUpdated",
                    routingKey: ""
                    );

                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    accountUpdated(message.ToString());

                };
                _channel.BasicConsume(
                    queue: queueName,
                    autoAck: true,
                    consumer: consumer
                    );
            }


           
        }
        
        
    
        public void accountUpdated(string message)
        {
            Console.WriteLine(message);
            User user = JsonSerializer.Deserialize<User>(message);            
            try
            {
                _userAuthenticationService.UpdateUser(user);
            }catch (Exception ex)
            {

            }
        }
    }
}
