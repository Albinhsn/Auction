using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class EmailAuction
    {
        public string AuctionName { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        public int Price { get; set; }
    }
}
