using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Models;

namespace UserMicroservice.Services
{
    public class UserService
    {

        private readonly IMongoCollection<User> _userCollection;
        public UserService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Users");

            _userCollection = db.GetCollection<User>("Users");
        }

        public async Task<User> GetUser(ObjectId Id)
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
                u.Id = new ObjectId();
                u.Favorites = new List<ObjectId>();
                _userCollection.InsertOne(u);
                return u;
            }catch (Exception ex)
            {
                return null;
            }                     
        }
        public async Task<bool> UpdateUser(User user, string Id)
        {
            user.Id = new ObjectId(Id);           
            var filter = Builders<User>.Filter.Where(x => x.Id == user.Id);
            var options = new FindOneAndReplaceOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };
            
            var result = await _userCollection.FindOneAndReplaceAsync<User>(x => x.Id == user.Id, user, options);
            Console.WriteLine(result);
            return true;
            //user.Id = new ObjectId(Id);
            //Console.WriteLine(user.Id);
            //Console.WriteLine(user.Name);
            //Console.WriteLine(user.Email);
            //Console.WriteLine(user.Password);
            //Console.WriteLine(user.Favorites);
            //var us = await _userCollection.FindOneAndUpdateAsync(
            //    Builders<User>.Filter.Where(x => x.Id == user.Id),                
            //    Builders<User>.Update
            //        .Set(x => x, user),
            //    options: new FindOneAndUpdateOptions<User>
            //    {
            //        ReturnDocument = ReturnDocument.After
            //    }
            //    ).ConfigureAwait(false);        
            //return us;
        }

       
        public async Task<bool> DeleteUser(ObjectId Id)
        {
            try
            {
                await _userCollection.DeleteOneAsync(x => x.Id == Id);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<string> GetUserName(ObjectId id)
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
