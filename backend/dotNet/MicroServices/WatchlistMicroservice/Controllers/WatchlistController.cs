using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WatchlistMicroservice.Models;


namespace WatchlistMicroservice.Controllers

{
    [ApiController]
    [Route("/api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class WatchlistController : ControllerBase
    {
        private readonly Services.WatchlistService _watchlistService;

        public WatchlistController(Services.WatchlistService watchlistService)
        {

            _watchlistService = watchlistService;
        }

        [HttpPost]
        public string CreateWatchlist([FromQuery] WatchlistPostModel watchlist)
        {
            return _watchlistService.SaveWatchlist(watchlist);
        }

        [HttpGet]
        public List<Watchlist> GetWatchlist(string token, string auctionId)
        {

            return _watchlistService.GetWatchlist(token, auctionId).Result;
        }


        [HttpPut]
        public bool UpdateWatchlist(string token, string auctionId, string type)
        {
            Console.WriteLine("GOT");
            return _watchlistService.UpdateWatchlist(token, auctionId, type).Result;
        }

        [HttpDelete]
        public DeleteResult DeleteWatchlist([FromQuery] string userId, [FromQuery] string auctionId)
        {
            return _watchlistService.DeleteWatchlist(userId, auctionId).Result;

        }


    }
}
