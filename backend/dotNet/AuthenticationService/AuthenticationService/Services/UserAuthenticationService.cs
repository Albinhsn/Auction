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
        public string AuthenticateUser(AuthenticateUserRequest req)
        {
            string jwt = _jwtHelpers.generateToken();
            return null;
        }

        public string AuthenticateJWT(String token)
        {
            return "";
        }

        
    }
}
