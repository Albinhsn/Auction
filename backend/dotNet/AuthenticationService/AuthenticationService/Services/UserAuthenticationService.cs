using AuthenticationService.Helpers;
using AuthenticationService.Models;

namespace AuthenticationService.Services
{
    public class UserAuthenticationService
    {
        private JWTHelpers _jwtHelpers;
        public UserAuthenticationService(JWTHelpers jwtHelpers)
        {
            _jwtHelpers = jwtHelpers;
        }
        public async Task<string> AuthenticateUser(AuthenticateUserRequest Req)
        {
            string jwt = await _jwtHelpers.generateToken(Req);
            return jwt;
        }

        public bool AuthenticateJWT(String token)
        {
            return  _jwtHelpers.validateToken(token);  
           
            
        }

        
    }
}
