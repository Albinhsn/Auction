using BidMicroService.Models;
using BidMicroService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BidMicroService.Controllers
{
    [ApiController]
    [Route("/api/bid/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class BidController : ControllerBase
    {
        private readonly BidService _bidService;

        public BidController(BidService bidService)
        {
            _bidService = bidService;
        }

        [HttpGet("/api/bid/[controller]/swiss")]
        public Bid GetMyHighestBid(string auctionId, string token)
        {
            Bid bid = _bidService.GetMyHighestBid(auctionId, token).Result;
            if(bid.Amount == -1)
            {
                return null;
            }
            else
            {
                return bid;
            }
        }

        [HttpGet("/api/bid/[controller]/")]
        public List<Bid> GetAllBidsByAuction(string Id)
        {
            return _bidService.GetAllBidsByAuction(Id);
        }
        [HttpPost]
        public IActionResult CreateBid(BidPostModel bid)
        {
            Console.WriteLine(bid.Amount);
            Bid? b =  _bidService.CreateBid(bid).Result;
            if(b == null)
            {
                return BadRequest("Kan inte buda på din egna auktion");
            }
            else
            {
                return Ok(b);
            }
        }
        [HttpGet("/api/bid/[controller]/highest")]
        public HighestBid? GetHighestBidOnAuction(string Id)
        {
            return _bidService.GetHighestBidOnAuction(Id).Result;
        }
    }
}
