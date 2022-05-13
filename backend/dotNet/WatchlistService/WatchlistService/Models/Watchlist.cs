using MongoDB.Bson;

namespace WatchlistService.Models
{
    public class Watchlist
    {

        public ObjectId Id { get; set; }
        public string? Type { get; set; }
        public ObjectId UserId { get; set; }

        public ObjectId AuctionId { get; set; }

    }
}
