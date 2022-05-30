using BidMicroService.RabbitMQ;
using BidMicroService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
RabbitMQConnection connection = new();
BidService service = new(connection);
builder.Services.AddSingleton<BidService>(service);

GetAllAuctionHighestBidReceiver messageHighestBidReceiver = new (service, connection);
HigestBidFromListOfIdsReceiver higestBidFromListOfIdsReceiver = new (service, connection);
AuctionEndedReceiver messageEndedReceiver = new (service, connection); 
GetAuctionBidsReceiver messageAuctionBidsReceiver = new(service, connection);
GetLowestHighestBidLimitedReceiver getLowestHighestBidLimitedReceiver= new(service, connection);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://188.166.50.198"
                                              )
                          .AllowAnyHeader()
                          .AllowAnyMethod();
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
