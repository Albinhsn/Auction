using AuthenticationService.Helpers;
using AuthenticationService.RabbitMQ;
using AuthenticationService.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
UserAuthenticationService service = new();
builder.Services.AddSingleton<UserAuthenticationService>(service);
builder.Services.AddSingleton<JWTHelpers>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
                      policy =>
                      {
                          policy.WithOrigins("http://188.166.50.198")
                          .AllowAnyHeader()
                          .AllowAnyMethod(); 
                      });
});

RabbitMQConnection connection = new();
AccountUpdatedReceiver _messageReceiver = new(service, connection);
AccountCreatedReceiver _messageCreatedReceiver = new(service, connection);  
AccountDeletedReceiver _messageDeletedReceiver = new(service, connection);
GetIdFromTokenReceiver _getIdFromTokenReceiver = new (service, connection);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
