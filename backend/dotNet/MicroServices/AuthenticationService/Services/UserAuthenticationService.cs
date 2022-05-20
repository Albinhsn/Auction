using AuthenticationService.Helpers;
using AuthenticationService.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Services
{
    public class UserAuthenticationService
    {

        private readonly Env _env;
        private readonly IMongoCollection<User> _userCollection;

        public UserAuthenticationService()
        {
            
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

        public bool AuthenticateJWT(String token)
        {
            return  validateToken(token);  
           
            
        }

        public void CreateUser(User user)
        {
            _userCollection.InsertOneAsync(user);
            
        }
        
        public void DeleteUser(string Id)
        {
            _userCollection.DeleteOne(x => x.Id == Id);
        }
        public async Task<string?> generateToken(AuthenticateUserRequest Req)
        {
            Console.WriteLine(Req.getUsername());
            Console.WriteLine(Req.getPassword());
            User user = await _userCollection.Find(x => x.Email == Req.getUsername() && x.Password == Req.getPassword()).FirstOrDefaultAsync();

            if (user == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_env.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("Email", user.Email.ToString()),
                    new Claim("Password", user.Password.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            Console.WriteLine(tokenHandler.WriteToken(token));
            return tokenHandler.WriteToken(token);
        }

        public bool validateToken(string Token)
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
                return true;
            }
            catch
            {
                return false;
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
