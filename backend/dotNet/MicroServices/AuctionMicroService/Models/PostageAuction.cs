using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class PostageAuction
    {

        public int Weight { get; set; }
        public int Volume { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
