using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BidMicroService.Models
{
    public class Bid
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        public int Amount { get; set; }
    }
}
