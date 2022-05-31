using AuctionMicroService.RabbitMQ;
using AuctionMicroService.Services;
using RabbitMQ;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
AuctionService aucService = new();
builder.Services.AddSingleton<AuctionService>();
builder.Services.AddSingleton<RabbitMQConnection>();
RabbitMQConnection connection = new();

new AuctionEndedProducer(aucService, connection);
new GetAuctionNameFromIdReceiver(aucService, connection);
new IsBidderSellerReceiver(aucService, connection);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://188.166.50.198/")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                          ;
                                                
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
