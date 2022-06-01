using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Helpers;
using UserMicroservice.Models;
using UserMicroservice.RabbitMQ;

namespace UserMicroservice.Services
{
    public class UserService
    {

        private readonly IMongoCollection<User> _userCollection;
       
        private RabbitMQConnection _connection;
        public UserService()
        {
            RabbitMQConnection connection = new();
            _connection = connection;
            
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Users");                                    
            _userCollection = db.GetCollection<User>("Users");
        }

        public async Task<User> GetUser(string token)
        {
             
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            Console.WriteLine(token);
            string Id = getIdFromTokenProducer.GetIdFromToken(token);
            Console.WriteLine(Id);
            return await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
        }

        //public async Task<User> UpdatePassword(string token, string password, string matchingpassword)
        //{
        //    _messageInfoChangedProducer = new(_connection);
        //    string Id = _getUserIdFromTokenProducer.GetIdFromToken(token);
        //    var filter = Builders<User>.Filter.Where(x => x.Id == Id);
        //    var options = new FindOneAndReplaceOptions<User>
        //    {
        //        ReturnDocument = ReturnDocument.After
        //    };
        //    User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
        //    user.Password = password;
        //    _messageInfoChangedProducer.sendAccountUpdatedMessage(user);
        //    return await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == Id, user, options);            
        //}
        public async Task<User> UpdateEmail(string token, string email, string matchingEmail)
        {
            //Helper för att kolla valid email
            if (email != matchingEmail)
            {
                return null;
            }
            UserHelpers helper = new();
            if (!helper.IsEmail(email))
            {
                return null;
            }
            User u = await _userCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
            if (u != null)
            {
                return null;
            }
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);

            string Id = getIdFromTokenProducer.GetIdFromToken(token);
            var filter = Builders<User>.Filter.Where(x => x.Id == Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };
            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();

            user.Email = email;
            user = await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == Id, user, options);

            AccountUpdatedProducer accountUpdatedProducer = new(_connection);
            accountUpdatedProducer.sendAccountUpdatedMessage(user);
            return user;
        }
        public  async Task<User> CreateUser(UserPostModel user)
        {
            
            User x = await _userCollection.Find(x => x.Email == user.Email).FirstOrDefaultAsync();
            if (x != null)
            {
                return null;
            }
            try
            {
                User u = new();
                u.Name = user.Name;
                u.Email = user.Email;
                u.Password = user.Password;
              
                u.Favorites = new List<string>();
                _userCollection.InsertOne(u);
                AccountCreationProducer accountCreationProducer = new(_connection);
                accountCreationProducer = new(_connection);
                accountCreationProducer.sendAccountCreatedMessage(u);
                return u;
            }catch (Exception ex)
            {
                return null;
            }                     
        }

        public async Task<List<User>> GetUsernameFromListOfIds(List<string> Ids)
        {
            List<User> users = await _userCollection.Find(x => Ids.Contains(x.Id)).ToListAsync();
            
            
            Console.WriteLine("Got names");
            return users;
        }

        public async Task<List<string>> GetFavorites(string Id)
        {
            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            Console.WriteLine(user.Favorites);
            return user.Favorites;
        }

        public async Task<bool> IsFavorite(string auctionId, string token)
        {

            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string id = getIdFromTokenProducer.GetIdFromToken(token);
            User user = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            Console.WriteLine(token, id);
            if(user == null)
            {
                return false;
            }
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
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId = getIdFromTokenProducer.GetIdFromToken(token);
            User user = await _userCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();
            if (user.Favorites.Any(x => x == auctionId))
            {
                
                user.Favorites.Remove(auctionId);
                UpdateUser(user, userId);
                return false;
            }
            else
            {
                
                user.Favorites.Add(auctionId);
                UpdateUser(user, userId);
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
            AccountUpdatedProducer accountUpdatedProducer = new(_connection);            
            accountUpdatedProducer.sendAccountUpdatedMessage(user);
            
            return true;            
        }

       
        public async void DeleteUser(string Id)
        {

            User user = await _userCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            _userCollection.DeleteOne(x => x.Id == Id);
            AccountDeletedProducer accountDeletedProducer = new(_connection);
            accountDeletedProducer = new(_connection);
            accountDeletedProducer.sendAccountDeletedMessage(user);
             
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
