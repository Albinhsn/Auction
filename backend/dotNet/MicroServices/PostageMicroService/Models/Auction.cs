using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PostageMicroService.Models
{
    public class Auction
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }
        public int Postage { get; set; }

    }
}