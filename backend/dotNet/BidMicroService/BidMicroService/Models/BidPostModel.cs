using MongoDB.Bson;

namespace BidMicroService.Models
{
    public class BidPostModel
    {
        public string AuctionId { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
    }
}
