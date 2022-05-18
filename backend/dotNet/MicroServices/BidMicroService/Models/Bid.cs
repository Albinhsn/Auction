using MongoDB.Bson;

namespace BidMicroService.Models
{
    public class Bid
    {
        public ObjectId Id { get; set; }
        public ObjectId AuctionId { get; set; }
        public ObjectId UserId { get; set; }
        public int Amount { get; set; }
    }
}
