using AuctionMicroService.Models;
using AuctionMicroService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace AuctionMicroService.Controllers
{
    [ApiController]
    [Route("/api/auction/[controller]")]
    
    public class AuctionController : ControllerBase
    {

        AuctionService _auctionService;

        public AuctionController(AuctionService auctionService)
        {
            _auctionService = auctionService;
        }        

        [HttpGet]
        public List<Auction> GetAll()
        {
            return _auctionService.GetAll().Result;
        }
        [HttpGet("/api/[controller]/user/auctions")]
        public List<Auction> GetUserAuctions(string Id)
        {
            return _auctionService.GetUserAuctions(Id).Result;
        }
        [HttpGet("/api/[controller]/user/favorites")]
        public List<Auction> GetUserFavorites(string Id)
        {
            //return _auctionService.GetUserFavorites();
            return null;
        }


        [HttpPost]
        public IActionResult PostAuction([FromBody] AuctionPostModel auc, [FromQuery] int weight, [FromQuery] int volume)
        {
                //AuctionHelpers.ValidateAuction c:
                _auctionService.CreateAuction(auc, weight, volume);
            

            return Ok("Created Auction");
        }
        [HttpGet("/api/[controller]/single/auction")]
        public async Task<Auction> getAuction(string id)
        {
            return await _auctionService.GetAuction(id);
        }


        [HttpPut("/api/[controller]/update")]
        public async Task<Auction> UpdateAuction( Auction auc, string Id)
        {
            return await _auctionService.UpdateAuction(auc, Id);
        }

        [HttpGet("/api/auction/[controller]/sorted/limited")]
        public List<Auction> GetAuctionsSortedLimited([FromQuery] string sort, [FromQuery] int direction, [FromQuery] int limitedBy)
        {
            
            return _auctionService.GetAuctionsSortedLimited(sort, direction, limitedBy);
        }

        [HttpPut("/api/[controller]/purchase")]
        public void MadePurchase(string userId, string auctionId)
        {
            _auctionService.MadePurchase(userId, auctionId);
        }
    }
}
