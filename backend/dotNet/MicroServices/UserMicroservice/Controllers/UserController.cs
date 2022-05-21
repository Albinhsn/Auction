using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserMicroservice.Models;
using UserMicroservice.Services;

namespace UserMicroservice.Controllers
{
    [ApiController]
    [Route("/api/user/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        public IActionResult CreateUser(UserPostModel user)
        {
            User u = _userService.CreateUser(user);

            return Ok(u);
        }

        [HttpGet]
        public User GetUser(string token)
        {
            Console.WriteLine(token);
            return _userService.GetUser(token).Result;
        }

        [HttpPut("/api/[controller]/password")]
        public User UpdatePassword(string token, string password, string matchingPassword)
        {            
            return _userService.UpdatePassword(token, password, matchingPassword).Result;
        }
        [HttpPut("/api/[controller]/email")]
        public User UpdateEmail(string token, string email, string matchingEmail)
        {
            return _userService.UpdateEmail(token, email, matchingEmail).Result;
        }

        
        [HttpGet("/api/[controller]/update/favorite")]
        public bool UpdateFavorite(string token, string auctionId)
        {
            return _userService.UpdateFavorite(auctionId, token).Result;
        }
        [HttpDelete]
        public void  DeleteUser(string Id)
        {
            _userService.DeleteUser(Id);
        }
        [HttpGet("/api/[controller]/name")]
        public string GetUserName(string Id)
        {
            return _userService.GetUserName(Id).Result;
        }
        [HttpGet("/api/[controller]/favorite")]
        public bool IsFavorite(string auctionId, string token)
        {
            return _userService.IsFavorite(auctionId, token).Result;
        }
    }
}
