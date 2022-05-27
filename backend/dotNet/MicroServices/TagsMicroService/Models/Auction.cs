using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TagsMicroService.Models
{
    public class Auction
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 
        public Tag Tags { get; set; }
    }
}
