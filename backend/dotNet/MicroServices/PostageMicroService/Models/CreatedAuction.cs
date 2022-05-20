using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PostageMicroService.Models
{
    public class CreatedAuction
    {
        public int Weight { get; set; }
        public int Volume { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AuctionId { get; set; }
    }
}
