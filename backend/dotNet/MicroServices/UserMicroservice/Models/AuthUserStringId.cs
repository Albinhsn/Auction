using MongoDB.Bson;

namespace UserMicroservice.Models
{
    public class AuthUserStringId
    {
        public string? Id { get; set; }
        public string? Email { get; set; }    
        public string? Password { get; set; }
    }
}
