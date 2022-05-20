using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Models;
using UserMicroservice.RabbitMQ;

namespace UserMicroservice.Services
{
    public class UserService
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly AccountDeletedProducer _messageDeletedProducer;
        private readonly AccountCreationProducer _messageCreationProducer;
        private readonly AccountInfoChangedProducer _messageInfoChangedProducer;
        public UserService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Users");
            _messageDeletedProducer = new AccountDeletedProducer();
            _messageCreationProducer = new AccountCreationProducer();   
            _userCollection = db.GetCollection<User>("Users");
        }

        public async Task<User> GetUser(string Id)
        {
            return await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
        }

        public  User CreateUser(UserPostModel user)
        {
            try
            {
                User u = new();
                u.Name = user.Name;
                u.Email = user.Email;
                u.Password = user.Password;
                
                u.Favorites = new List<string>();
                _userCollection.InsertOne(u);                
                _messageCreationProducer.sendAccountCreatedMessage(u);
                return u;
            }catch (Exception ex)
            {
                return null;
            }                     
        }
        public async Task<bool> UpdateUser(User user, string Id)
        {                       
            var filter = Builders<User>.Filter.Where(x => x.Id == Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };
            
            var result = await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == user.Id, user, options);
            _messageInfoChangedProducer.sendAccountUpdatedMessage(user);
            Console.WriteLine(result);
            return true;            
        }

       
        public async void DeleteUser(string Id)
        {

                User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
                _userCollection.DeleteOne(x => x.Id == Id);
                _messageDeletedProducer.sendAccountDeletedMessage(user);
             
        }
        public async Task<string> GetUserName(string id)
        {
            User user = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            return user.Name;
        }

    }
}
