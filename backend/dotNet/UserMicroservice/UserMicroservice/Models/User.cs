using MongoDB.Bson;

namespace UserMicroservice.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public List<ObjectId> Favorites { get; set; }

    }
}
