using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WatchlistMicroservice.Models
{
    public class Watchlist
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string? Type { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }

    }
}
