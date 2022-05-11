using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using WatchlistService.Models;

namespace WatchlistService.Services
{
    public class WatchListService
    {
        private readonly IMongoCollection<Watchlist> _watchlistCollection;
         

        public WatchListService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

            var db = client.GetDatabase("Watchlist");

            _watchlistCollection = db.GetCollection<Watchlist>("Watchlist");
            
        }

        public async Task<Watchlist?>getAsync(ObjectId id) =>
             await _watchlistCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        

    }
}
