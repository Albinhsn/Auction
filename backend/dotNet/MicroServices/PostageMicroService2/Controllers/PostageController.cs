using AuctionMicroService.Models;
using AuctionMicroService.Services;
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
            _postageService = PostageService
    }

        [HttpGet]
        public list<Auction>
    }
}
