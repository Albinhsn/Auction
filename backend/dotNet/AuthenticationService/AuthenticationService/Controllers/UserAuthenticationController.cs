using AuthenticationService.Models;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationService.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class UserAuthenticationController : ControllerBase
    {
        private UserAuthenticationService _userAuthenticationService;

        public UserAuthenticationController(UserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
        }

        [HttpPost("AuthenticateUser")]
        public IActionResult AuthenticateUser(AuthenticateUserRequest req)
        {
            var response = _userAuthenticationService.AuthenticateUser(req);

            if(response == null)
            {
                return BadRequest(new {message = "Username or password is incorrect"});
            }

            return Ok(response);
        }

        [HttpPost("AuthenticateToken")]
        public IActionResult AuthenticateJWT(String token)
        {
            var response = _userAuthenticationService.AuthenticateJWT(token);

            if(response == null)
            {
                return BadRequest(new { message = "Invalid token" });
            }
            return Ok(response);
        }
    }
}
