using AuthenticationService.Models;
using Microsoft.AspNetCore.Cors;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationService.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UserAuthenticationController : ControllerBase
    {
        private UserAuthenticationService _userAuthenticationService;
        
        public UserAuthenticationController(UserAuthenticationService userAuthenticationService) =>        
            _userAuthenticationService = userAuthenticationService;
            

        [HttpPost("AuthenticateUser")]
        
        public async Task<IActionResult?> AuthenticateUser([FromBody] AuthenticateUserRequest req)
        {
            var response = await _userAuthenticationService.AuthenticateUser(req);

            if(response == null)
            {
                return BadRequest(new {message = "Username or password is incorrect"});
            }
            Response.Headers.AccessControlAllowOrigin = "*";
            return Ok(response.ToString());
        }

        [HttpPost("AuthenticateToken")]
        public IActionResult AuthenticateJWT()
        {
            string token = Request.Headers["Authorization"];
            token = token.Split().Last();
            Console.WriteLine(token);   
            string response = _userAuthenticationService.AuthenticateJWT(token);

            if(response == null)
            {
                return BadRequest(new { message = "Invalid token" });
            }
            return Ok(response);
        }
        [HttpPut("/api/[controller]/update/password")]
        public IActionResult ChangePassword(ChangePasswordModel model)
        {
            string result = _userAuthenticationService.ChangePassword(model).Result;
            if(result != "good")
            {
                return BadRequest(result);
            }
            return Ok("Lösenordet byttes, vänligen logga in igen");
        }
    }
}
