using PostageMicroService.Models;
using System.Text.Json;
using MongoDB.Bson;
using MongoDB.Driver;

namespace PostageMicroService.Services

{
    public class PostageService
    {


        private readonly IMongoCollection<Auction> _postageCollection;
        public PostageService()
        {

            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Postage");

            _postageCollection = db.GetCollection<Auction>("Auctions");
            
        }
        


        public async Task<int> GetPostagePrice(string id)
        {
   
            Auction getpostage = await _postageCollection.Find(x => x.AuctionId == id).FirstOrDefaultAsync();
 
            return getpostage.Postage;

        }
        
        public void CreatePostage(string id, int weight, int volume)
        {
            int newWeight;
            int newVolume;
            Auction newAuc = new();
            newWeight = weight;
            newVolume = volume;
            newAuc.AuctionId = id;

            if (newWeight <= 2 && newVolume <= 100)
            {
                newAuc.Postage = 39;
            }
            else if (newWeight <= 4 && newVolume <= 250)
            {
                newAuc.Postage = 79;
            }
            else
            {
                newAuc.Postage = 129;
            }
            _postageCollection.InsertOne(newAuc);

            

        }

        public async Task<bool> DeletePostage(string id)
        {
           
            {
                await _postageCollection.DeleteOneAsync(x => x.AuctionId == id);
                return true;
            }
           
        }


    }

}