using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthenticationService.Models
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }        
    }
}
