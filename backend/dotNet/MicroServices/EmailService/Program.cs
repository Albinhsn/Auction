using EmailService;
using EmailService.EmailConfig;
using EmailService.RabbitMQ;
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
new AccountCreatedReceiver(new EmailsService(myOptions));
new AccountDeletedReceiver(new EmailsService(myOptions));
new AuctionEndedReceiver(new EmailsService(myOptions));
new MadePurchaseReceiver(new EmailsService(myOptions));
new AccountUpdatedReceiver(new EmailsService(myOptions));
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
