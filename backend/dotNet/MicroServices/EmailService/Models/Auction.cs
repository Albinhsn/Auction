using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EmailService
{
    public class Auction
    {
        
        public string AuctionName { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        public int Price { get; set; }
        

        
    }

}
