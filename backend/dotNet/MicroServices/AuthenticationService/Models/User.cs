using MongoDB.Bson;

namespace AuthenticationService.Models
{
    public class User
    {

        public ObjectId Id;
        public string Email;
        public string Password;

        public User(ObjectId i, string e, string p)
        {
            Id = i;
            Email = e;
            Password = p;
        }
    }
}
