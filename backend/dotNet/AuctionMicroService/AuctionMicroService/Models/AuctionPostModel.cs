using MongoDB.Bson;

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
        public ObjectId Seller { get; set; }
        
    }
}
