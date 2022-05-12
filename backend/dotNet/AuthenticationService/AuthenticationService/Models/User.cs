using MongoDB.Bson;

namespace AuthenticationService.Models
{
    public class User
    {
        public ObjectId Id;
        public string Username;
        public string Password;
    }
}
