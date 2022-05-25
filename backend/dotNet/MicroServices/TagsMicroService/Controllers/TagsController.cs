using Microsoft.AspNetCore.Mvc;
using TagsMicroService.Models;
using TagsMicroService.Services;

namespace TagsMicroService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TagsController :ControllerBase
    {
        TagsService _tagsService;
        public TagsController(TagsService tagsService)
        {
            _tagsService = tagsService;
        }
        [HttpGet]
        public List<Tag> GetAuctionBySearchTags(string search)
        {
            
            return _tagsService.GetAuctionBySearchTags(search).Result;
        }

        [HttpGet("/api/[controller]/auction")]
        public Tag GetTagsFromAuction(string Id)
        {
            return _tagsService.GetTagsFromAuction(Id).Result;
        }
    }
}
