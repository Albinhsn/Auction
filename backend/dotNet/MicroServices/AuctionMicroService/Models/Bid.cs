using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class Bid
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
    }
}
