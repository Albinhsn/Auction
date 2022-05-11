using MongoDB.Bson;

namespace WatchlistService.Models
{
    public class Watchlist
    {

        public ObjectId Id { get; set; }
        public string? type { get; set; }
        public ObjectId userId { get; set; }


    }
}
