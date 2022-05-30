using PostageMicroService.Models;
using PostageMicroService.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Microsoft.AspNetCore.Cors;

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
        public async void DeletePostage(string id)
        {
            await _postageService.DeletePostage(id);
        }
        [HttpPost]
        public IActionResult PostPostage(string id, int weight, int volume)
        {
            
            
                _postageService.CreatePostage(id, weight, volume);

            return Ok("Created Auction");
            
            
            


        }
    }
}

    

