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

        //public async Task<Watchlist?>GetAsync(ObjectId id) =>
        //     await _watchlistCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        
        //TODO
        public ObjectId SaveWatchlist(WatchlistPostModel watchlist)
        {
            Watchlist W = new Watchlist();
            W.Id = new ObjectId();
            W.AuctionId = new ObjectId(watchlist.AuctionId);
            W.UserId = new ObjectId(watchlist.UserId);  
            W.Type = watchlist.Type;            
            _watchlistCollection.InsertOne(W);

            return W.Id;
            
            
            
        }

        public async Task<Watchlist> UpdateWatchlist(ObjectId userId, ObjectId auctionId, string type)
        {
            var watchlist = await _watchlistCollection.FindOneAndUpdateAsync(
                Builders<Watchlist>.Filter.Where(x => x.UserId == userId && x.AuctionId == auctionId),
                Builders<Watchlist>.Update
                    .Set(x => x.Type, type),
                options: new FindOneAndUpdateOptions<Watchlist>
                {
                    ReturnDocument = ReturnDocument.After
                }
                ).ConfigureAwait(false);

            return watchlist;
        }

        public async Task<DeleteResult> DeleteWatchlist(ObjectId userId, ObjectId auctionId)
        {
            try
            {
                return await _watchlistCollection.DeleteOneAsync(x => x.UserId == userId && x.AuctionId == auctionId);
                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Task<Watchlist> GetWatchlist(ObjectId userId, ObjectId auctionId)
        {
            return _watchlistCollection.Find(x => x.UserId == userId && x.AuctionId == auctionId).FirstOrDefaultAsync();
        }

    }
}
