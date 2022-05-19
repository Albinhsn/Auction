using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BidMicroService.Models
{
    public class HighestBid
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int Amount { get; set; }

        public HighestBid(string i, int a)
        {
            Id = i;
            Amount = a;
        }
    }
}
