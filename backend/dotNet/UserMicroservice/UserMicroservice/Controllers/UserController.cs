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
        public User GetUser(string Id)
        {
            return _userService.GetUser(new ObjectId(Id)).Result;
        }

        [HttpPut]
        public bool UpdateUser([FromBody] User user, string Id)
        {
            
            return _userService.UpdateUser(user, Id).Result;
        }

        [HttpDelete]
        public bool  DeleteUser(string Id)
        {

            return _userService.DeleteUser(new ObjectId(Id)).Result;
        }
        [HttpGet("/api/user/[controller]/name")]
        public string GetUserName(string Id)
        {
            return _userService.GetUserName(new ObjectId(Id)).Result;
        }
    }
}
