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
        private readonly AccountUpdatedProducer _messageInfoChangedProducer;
        private readonly GetIdFromTokenProducer _getUserIdFromTokenProducer;
        public UserService()
        {
            _getUserIdFromTokenProducer = new ();
            
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Users");
            _messageDeletedProducer = new AccountDeletedProducer();
            _messageCreationProducer = new AccountCreationProducer();   
            _messageInfoChangedProducer = new AccountUpdatedProducer();
            _userCollection = db.GetCollection<User>("Users");
        }

        public async Task<User> GetUser(string token)
        {
            string Id = _getUserIdFromTokenProducer.GetIdFromToken(token);
            Console.WriteLine(Id);
            return await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<User> UpdatePassword(string token, string password, string matchingpassword)
        {
            string Id = _getUserIdFromTokenProducer.GetIdFromToken(token);
            var filter = Builders<User>.Filter.Where(x => x.Id == Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };
            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            user.Password = password;
            _messageInfoChangedProducer.sendAccountUpdatedMessage(user);
            return await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == Id, user, options);            
        }
        public async Task<User> UpdateEmail(string token, string email, string matchingEmail)
        {
            
            string Id = _getUserIdFromTokenProducer.GetIdFromToken(token);
            var filter = Builders<User>.Filter.Where(x => x.Id == Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };
            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            user.Email = email;
            user = await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == Id, user, options);
            _messageInfoChangedProducer.sendAccountUpdatedMessage(user);
            return user;
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

        public async Task<List<string>> GetFavorites(string Id)
        {
            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            Console.WriteLine(user.Favorites);
            return user.Favorites;
        }

        public async Task<bool> IsFavorite(string auctionId, string token)
        {
            string id = _getUserIdFromTokenProducer.GetIdFromToken(token);
            User user = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            List<string> favorites = user.Favorites;
            if (favorites.Contains(auctionId))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<bool> UpdateFavorite(string auctionId, string token)
        {
            string userId = _getUserIdFromTokenProducer.GetIdFromToken(token);
            User user = await _userCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();
            if (user.Favorites.Any(auctionId.Contains))
            {
                user.Favorites.Remove(auctionId);
                return false;
            }
            else
            {
                user.Favorites.Add(auctionId);
                return true;
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
