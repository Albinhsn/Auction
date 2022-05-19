using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class HighestBid
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }
        public int Amount { get; set; }
    }
}
