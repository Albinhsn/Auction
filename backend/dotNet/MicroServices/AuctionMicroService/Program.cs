using AuctionMicroService.RabbitMQ;
using AuctionMicroService.Services;
using RabbitMQ;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<AuctionService>();
builder.Services.AddSingleton<AuctionEndedProducer>();
builder.Services.AddSingleton<AuctionPurchasedProducer>();
builder.Services.AddSingleton<RabbitMQConnection>();
RabbitMQConnection connection = new();
new AuctionPurchasedProducer(new AuctionService(), connection);
new AuctionEndedProducer(new AuctionService(), connection);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000"
                                              );
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
