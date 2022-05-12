using AuthenticationService.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Helpers
{
    public class JWTHelpers
    {
        private readonly Env _env;
        private readonly IMongoCollection<User> _userCollection;
        public JWTHelpers(IOptions<Env> env)
        {
            _env = env.Value;
            MongoClient client = new("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Authentication");

            _userCollection = db.GetCollection<User>("Users");
        }

        public async Task<string?> generateToken(AuthenticateUserRequest Req)
        {
            Console.WriteLine(Req.getUsername());
            Console.WriteLine(Req.getPassword());
            User user = await _userCollection.Find(x => x.Username == Req.getUsername() && x.Password == Req.getPassword()).FirstOrDefaultAsync();
            
            if (user == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_env.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new [] {
                    new Claim("Username", user.Username.ToString()),
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
                tokenHandler.ValidateToken(Token, new TokenValidationParameters{
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

    }
}
