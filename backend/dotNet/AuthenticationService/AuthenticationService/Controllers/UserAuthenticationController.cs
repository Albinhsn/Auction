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

        public UserAuthenticationController(UserAuthenticationService userAuthenticationService) =>        
            _userAuthenticationService = userAuthenticationService;
        

        [HttpPost("AuthenticateUser")]
        public async Task<IActionResult?> AuthenticateUser(AuthenticateUserRequest req)
        {
            var response = await _userAuthenticationService.AuthenticateUser(req);

            if(response == null)
            {
                return BadRequest(new {message = "Username or password is incorrect"});
            }
            Console.WriteLine(response);   
            return Ok(response);
        }

        [HttpPost("AuthenticateToken")]
        public IActionResult AuthenticateJWT()
        {
            string token = Request.Headers["Authorization"];
            token = token.Split().Last();
            Console.WriteLine(token);   
            bool response = _userAuthenticationService.AuthenticateJWT(token);

            if(response == false)
            {
                return BadRequest(new { message = "Invalid token" });
            }
            return Ok(response);
        }
    }
}
