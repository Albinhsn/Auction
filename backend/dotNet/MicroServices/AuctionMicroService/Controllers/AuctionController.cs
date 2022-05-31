using AuctionMicroService.Helpers;
using AuctionMicroService.Models;
using AuctionMicroService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace AuctionMicroService.Controllers
{
    [ApiController]
    [Route("/api/auction/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
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
        public List<Auction> GetUserFavorites(string token)
        {
            return _auctionService.GetFavorites(token).Result;                        
        }
        [HttpGet("/api/[controller]/user/watchlist")]
        public List<Auction> GetUserWatchlist(string token)
        {
            return _auctionService.GetUserWatchlist(token).Result;
        }

        [HttpGet("/api/[controller]/search")]
        public List<Auction> GetAuctionsBySearch(string? search)
        {
            
            return _auctionService.GetAuctionsBySearch(search).Result;
        }

        [HttpPost]
        public async Task<IActionResult> PostAuction([FromBody] AuctionPostModel auc)
        {
            //AuctionHelpers.ValidateAuction c:
            //TODO Check valid Auction
            AuctionValidationHelpers helper = new();
            string validated = helper.ValidateAuction(auc);
            Console.WriteLine(validated);
            if (validated != "")
            {
                return BadRequest(validated);
            }
            string id;
            try
            {
                id = await _auctionService.CreateAuction(auc);
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Bad request");
            }            
            if(id == null)
            {
                return BadRequest("Felaktig token");
            }

            return Ok(id);
        }
        [HttpGet("/api/[controller]/single/auction")]
        public async Task<Auction> GetAuction(string id)
        {
            return await _auctionService.GetAuction(id);
        }


        [HttpPut("/api/[controller]/update")]
        public async Task<Auction> UpdateAuction( Auction auc, string Id)
        {
            return await _auctionService.UpdateAuction(auc, Id);
        }
        [HttpGet("/api/auction/[controller]/sorted/purchasePrice")]
        public List<Auction> GetAuctionByPurchasePriceAsc()
        {
            return _auctionService.GetCheapestPurchasePrice().Result;
        }
        [HttpGet("/api/auction/[controller]/sorted/endDate")]
        public IActionResult GetAuctionsByEnddate()
        {
            List<Auction> aucs = _auctionService.GetShortestTimeRemaining().Result;
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return Ok(aucs);

        }
        [HttpGet("/api/auction/[controller]/sorted/highestBid")]
        public List<Auction> GetAuctionsByHighestBidAsc()
        {
            return _auctionService.GetCheapestBids().Result;
        }

        [HttpGet("/api/auction/[controller]/sorted/limited")]
        public List<Auction> GetAuctionsSortedLimited([FromQuery] string sort, [FromQuery] int direction, [FromQuery] int limitedBy)
        {
            
            return _auctionService.GetAuctionsSortedLimited(sort, direction, limitedBy).Result;
        }

        [HttpPut("/api/[controller]/purchase")]
        public async Task<Auction> MadePurchase(string token, string auctionId)
        {
            return await _auctionService.MadePurchase(token, auctionId);
        }
    }
}
