using TagsMicroService.RabbitMQ;
using TagsMicroService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
TagsService service = new();
builder.Services.AddSingleton<TagsService>(service);
RabbitMQConnection connection = new();
new GetAuctionTagsReceiver(service,connection);
new GetAuctionBySearchTagReceiver(service, connection);
new GetAuctionTagsFromListOfIdsReceiver(service, connection);
new AuctionCreatedReceiver(service, connection); 
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://188.166.50.198:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                          ;
                      })    
    ;
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
