using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using WatchlistService.Models;
using WatchlistService.Services;

namespace WatchlistService.Controllers

{
    [ApiController]
    [Route("/api")]
    public class WatchlistController : ControllerBase
    {
        private readonly WatchListService _watchlistService;

        public WatchlistController(WatchListService watchlistService) =>
            _watchlistService = watchlistService;
        

        [HttpGet()]
        public  async Task<ActionResult<Watchlist>> GetAll()
        {
            ObjectId oid = new ObjectId("62794312c796ac04fc9967c7");
            Console.WriteLine(oid.ToString());
            var watchlist = await _watchlistService.getAsync(oid);

            if(watchlist == null)
            {
                return NotFound();
            }
            return watchlist;
        }

    }
}
