using AuctionMicroService.Models;
using AuctionMicroService.Services;
using Microsoft.AspNetCore.Mvc;

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


        [HttpPost]
        public IActionResult PostAuction([FromBody] AuctionPostModel auc)
        {
            try
            {
                //AuctionHelpers.ValidateAuction c:
                _auctionService.CreateAuction(auc);
            } catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }

            return Ok("Created Auction");
        }

        [HttpPut]
        public async Task<Auction> UpdateAuction( Auction auc, string Id)
        {
            return await _auctionService.UpdateAuction(auc, Id);
        }

        [HttpGet("/api/auction/[controller]/sorted/limited")]
        public List<Auction> GetAuctionsSortedLimited([FromQuery] string sort, [FromQuery] int direction, [FromQuery] int limitedBy)
        {
            
            return _auctionService.GetAuctionsSortedLimited(sort, direction, limitedBy);
        }
    }
}
