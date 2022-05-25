using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace AuctionMicroService.Models
{
    public class Auction
    {
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Condition { get; set; }
        public string? AuctionType { get; set; }
        public string? Description { get; set; }
        public string? State { get; set; }
        public int MinimumBid { get; set; }
        public int PurchasePrice { get; set; }
        public int HighestBid { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> Images { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string Seller { get; set; }

        
        [BsonRepresentation(BsonType.ObjectId)]
        public string Winner { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<Bid> Bids{ get; set; }
        public int Postage { get; set; }
        
        public Tags? Tags { get; set; }

    }
}
