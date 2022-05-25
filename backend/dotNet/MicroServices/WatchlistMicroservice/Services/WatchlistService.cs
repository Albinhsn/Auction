using MongoDB.Bson;
using MongoDB.Driver;

using WatchlistMicroservice.Models;
using WatchlistMicroservice.RabbitMQ;

namespace WatchlistMicroservice.Services
{
    public class WatchlistService
    {
        private readonly IMongoCollection<Watchlist> _watchlistCollection;
        private readonly RabbitMQConnection _connection;

        public WatchlistService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

            var db = client.GetDatabase("Watchlist");

            _connection = new RabbitMQConnection();

            _watchlistCollection = db.GetCollection<Watchlist>("Watchlist");

        }

        //public async Task<Watchlist?>GetAsync(ObjectId id) =>
        //     await _watchlistCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //TODO
        public string SaveWatchlist(WatchlistPostModel watchlist)
        {
            Watchlist W = new Watchlist();
            W.Id = ObjectId.GenerateNewId().ToString();
            W.AuctionId = watchlist.AuctionId;
            W.UserId = watchlist.UserId;
            W.Type = watchlist.Type;
            _watchlistCollection.InsertOne(W);

            return W.Id;



        }

        public async Task<List<string>> GetReminderIdsByAuction(string Id)
        {
            Console.WriteLine(Id);
            List<Watchlist> watchlists = await _watchlistCollection.Find(x => x.AuctionId == Id && x.Type == "Updated").ToListAsync();
            List<string> Ids = new();
            foreach(var watchlist in watchlists)
            {
                Ids.Add(watchlist.UserId);
            }
            Console.WriteLine(Ids);
            return Ids;
        }

        public async Task<bool> UpdateWatchlist(string token, string auctionId, string type)
        {
            Console.WriteLine("GOT");
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId = getIdFromTokenProducer.GetIdFromToken(token);
            Watchlist watchlist = await _watchlistCollection.Find(x => x.UserId == userId && x.AuctionId == auctionId && x.Type == type).FirstOrDefaultAsync();
            Console.WriteLine("GOT");
            if (watchlist == null)
            {
                Watchlist w = new();
                w.AuctionId = auctionId;
                w.UserId = userId;
                w.Type = type;
                _watchlistCollection.InsertOne(w);
                return true;
            }
            Console.WriteLine("GOT");
            await _watchlistCollection.DeleteOneAsync(x => x.UserId == userId && x.AuctionId == auctionId && x.Type == type);
            return false;
            //var watchlist = await _watchlistCollection.FindOneAndUpdateAsync(
            //    Builders<Watchlist>.Filter.Where(x => x.UserId == userId && x.AuctionId == auctionId),
            //    Builders<Watchlist>.Update
            //        .Set(x => x.Type, type),
            //    options: new FindOneAndUpdateOptions<Watchlist>
            //    {
            //        ReturnDocument = ReturnDocument.After
            //    }
            //    ).ConfigureAwait(false);


        }
        
        public async Task<List<string>> GetUserWatchlist(string userId)
        {
            
            List<string> auctionIds = new();
            List<Watchlist> watchlists = await _watchlistCollection.Find(x => x.UserId == userId).ToListAsync();
            if(watchlists.Count > 0)
            {
                foreach(var watchlist in watchlists)
                {
                    if (auctionIds.Contains(watchlist.AuctionId))
                    {

                    }
                    else
                    {
                        auctionIds.Add(watchlist.AuctionId);
                    }
                }
                return auctionIds;
            }
            else
            {
                return auctionIds;
            }

        }
        public async Task<DeleteResult> DeleteWatchlist(string userId, string auctionId)
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

        public async Task<List<Watchlist>> GetWatchlist(string token, string auctionId)
        {
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId = getIdFromTokenProducer.GetIdFromToken(token);
            return await _watchlistCollection.Find(x => x.UserId == userId && x.AuctionId == auctionId).ToListAsync();
        }

    }
}
