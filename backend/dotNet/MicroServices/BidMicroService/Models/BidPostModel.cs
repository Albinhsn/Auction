using MongoDB.Bson;

namespace BidMicroService.Models
{
    public class BidPostModel
    {
        public string AuctionId { get; set; }
        public string Token { get; set; }
        public int Amount { get; set; }
    }
}
