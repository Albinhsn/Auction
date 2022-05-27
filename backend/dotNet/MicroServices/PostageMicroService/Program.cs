using PostageMicroService.RabbitMQ;
using PostageMicroService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
PostageService service = new();
builder.Services.AddSingleton<PostageService>(service);
RabbitMQConnection connection= new ();
new AuctionCreatedReceiver(service, connection);
new GetPostageReceiver(service, connection);
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
