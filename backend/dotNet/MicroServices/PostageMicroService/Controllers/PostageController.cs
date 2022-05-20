using PostageMicroService.Models;
using PostageMicroService.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace PostageMicroService.Controllers
{
    [ApiController]
    [Route("/api/Postage/[controller]")]
    public class PostageController : ControllerBase
    {
        PostageService _postageService;

        public PostageController(PostageService postageService)
        {
            _postageService = postageService;
        }

        [HttpGet]
        public int GetPostage(string id)
        {
            return _postageService.GetPostagePrice(id).Result;
        }
        [HttpDelete]
        public void DeletePostage(string id)
        {
            _postageService.DeletePostage(id);
        }
        [HttpPost]
        public IActionResult PostPostage(string id, int weight, int volume)
        {
            
            
                _postageService.CreatePostage(id, weight, volume);

            return Ok("Created Auction");
            
            
            


        }
    }
}

    

