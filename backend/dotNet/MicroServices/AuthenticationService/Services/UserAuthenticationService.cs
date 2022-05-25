using AuthenticationService.Helpers;
using AuthenticationService.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Services
{
    public class UserAuthenticationService
    {

        private readonly Env _env;
        private readonly IMongoCollection<User> _userCollection;
        private readonly string salt;
        public UserAuthenticationService()
        {
            salt = BCrypt.Net.BCrypt.GenerateSalt(10);
            _env = new();
            _env.Secret = "this is not supposed to be here";            
            MongoClient client = new("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Authentication");

            _userCollection = db.GetCollection<User>("Users");
        }
        public async Task<string> AuthenticateUser(AuthenticateUserRequest Req)
        {
            string jwt = await generateToken(Req);
            return jwt;
        }

        public string AuthenticateJWT(String token)
        {
            return  validateToken(token);  
           
            
        }

        public void CreateUser(User user)
        {
            
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _userCollection.InsertOneAsync(user);
            
        }
        
        public void DeleteUser(string Id)
        {
            _userCollection.DeleteOne(x => x.Id == Id);
        }
        public async Task<string?> generateToken(AuthenticateUserRequest Req)
        {
            
            User user = await _userCollection.Find(x => x.Email == Req.Email).FirstOrDefaultAsync();

            if (user == null ||!BCrypt.Net.BCrypt.Verify(Req.Password, user.Password))
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_env.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("Email", user.Email.ToString()),
                    new Claim("Password", user.Password.ToString()),
                    new Claim("_id", user.Id)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            Console.WriteLine(tokenHandler.WriteToken(token));
            return tokenHandler.WriteToken(token);
        }

        public string validateToken(string Token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_env.Secret);
            try
            {
                tokenHandler.ValidateToken(Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwt = (JwtSecurityToken)validatedToken;
                Console.WriteLine(jwt.Claims.First(claim => claim.Type == "Email"));
                return jwt.Claims.First(claim => claim.Type == "_id").Value;
            }
            catch
            {
                return null;
            }
        }
        public async void UpdateUser(User user)
        {
            var filter = Builders<User>.Filter.Where(x => x.Id == user.Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };

            await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == user.Id, user, options);
        }
    }
}
