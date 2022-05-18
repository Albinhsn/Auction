using MongoDB.Bson;

namespace AuctionMicroService.Models
{
    public class Auction
    {
        public ObjectId Id { get; set; }
        public string? Name { get; set; }
        public string? Condition { get; set; }
        public string? AuctionType { get; set; }
        public string? Description { get; set; }
        public string? State { get; set; }
        public int MinimumBid { get; set; }
        public int PurchasePrice { get; set; }
        public ObjectId Seller { get; set; }
        public ObjectId? Winner { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
