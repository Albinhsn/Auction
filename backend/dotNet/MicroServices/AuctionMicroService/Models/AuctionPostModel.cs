using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class AuctionPostModel
    {
        public string? Name { get; set; }
        public string? Condition { get; set; }
        public string? AuctionType { get; set; }
        public string? Description { get; set; }
        public int MinimumBid { get; set; }
        public int PurchasePrice { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Seller { get; set; }
        
    }
}
