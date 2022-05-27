using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class AuctionPostModel
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Condition { get; set; }
        public string? AuctionType { get; set; }
        public string? Description { get; set; }
        
        public int MinimumBid { get; set; }
        public int PurchasePrice { get; set; }                
        public string? SellerToken { get; set; }
        public List<string>? Images { get; set; }
        public int Weight { get; set; }
        public int Volume { get; set; }
        public Tags? Tags { get; set; }

        
    }
}
