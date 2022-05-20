using AuthenticationService.Helpers;
using AuthenticationService.RabbitMQ;
using AuthenticationService.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<UserAuthenticationService>();
builder.Services.AddSingleton<JWTHelpers>();
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000"
                                              )
                          .AllowAnyHeader()
                          .AllowAnyMethod(); 
                      });
});
AccountUpdatedReceiver _messageReceiver = new(new UserAuthenticationService());
AccountCreatedReceiver _messageCreatedReceiver = new(new UserAuthenticationService());  
AccountDeletedReceiver _messageDeletedReceiver = new(new UserAuthenticationService());
new GetIdFromTokenReceiver(new UserAuthenticationService());
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
