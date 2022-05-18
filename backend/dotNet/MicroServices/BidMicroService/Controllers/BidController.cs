using BidMicroService.Models;
using Microsoft.AspNetCore.Mvc;

namespace BidMicroService.Controllers
{
    [ApiController]
    [Route("/api/bid/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly BidService _bidService;

        public BidController(BidService bidService)
        {
            _bidService = bidService;
        }

        [HttpGet("/api/bid/[controller]/auction")]
        public List<Bid> GetAllBidsByAuction(string Id)
        {
            return _bidService.GetAllBidsByAuction(Id);
        }
        [HttpPost]
        public List<Bid> CreateBid(BidPostModel bid)
        {
            return _bidService.CreateBid(bid);
        }
        [HttpGet("/api/bid/[controller]/highest")]
        public Bid GetHighestBidOnAuction(string Id)
        {
            return _bidService.GetHighestBidOnAuction(Id);
        }
    }
}
