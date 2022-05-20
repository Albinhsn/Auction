using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthenticationService.Models
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id;
        public string Email;
        public string Password;

        public User(string i, string e, string p)
        {
            Id = i;
            Email = e;
            Password = p;
        }
    }
}
