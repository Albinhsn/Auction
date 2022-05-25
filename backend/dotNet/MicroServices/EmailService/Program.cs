using EmailService.EmailConfig;
using EmailService.RabbitMQ;
using EmailService.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("EmailConfiguration"));
builder.Services.AddSingleton<EmailsService>();
EmailConfiguration config = new();
builder.Configuration.GetSection("EmailConfiguration").Bind(config);
IOptions<EmailConfiguration> myOptions = Options.Create(config);
builder.Configuration.GetSection("EmailConfiguration").Bind(myOptions);
RabbitMQConnection connection = new();
EmailsService service = new(myOptions);
new AccountCreatedReceiver(service);
new AccountDeletedReceiver(service);
new AuctionEndedReceiver(service);
new AuctionPurchasedReceiver(service);
new AccountUpdatedReceiver(service);
new AuctionPurchasedWatchlistReceiver(service, connection);
new AuctionBidWatchlistReceiver(service, connection);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
