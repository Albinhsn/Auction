using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WatchlistService.Models;
using WatchlistService.Services;

namespace WatchlistService.Controllers

{
    [ApiController]
    [Route("/api")]
    public class WatchlistController : ControllerBase
    {
        private readonly WatchListService _watchlistService;

        public WatchlistController(WatchListService watchlistService)
        {
            
            _watchlistService = watchlistService;
        }
        
        [HttpPost]
        public ObjectId CreateWatchlist([FromQuery] WatchlistPostModel watchlist)
        {            
            return _watchlistService.SaveWatchlist(watchlist);            
        }
        
        [HttpGet]
        public Watchlist GetWatchlist([FromQuery] string userId, [FromQuery] string auctionId)
        {
            
            return _watchlistService.GetWatchlist(new ObjectId(userId), new ObjectId(auctionId)).Result;
        }

        [HttpDelete]
        public DeleteResult DeleteWatchlist([FromQuery] string userId, [FromQuery] string auctionId)
        {
            return _watchlistService.DeleteWatchlist(new ObjectId(userId), new ObjectId(auctionId)).Result;
            
        }  


    }
}
