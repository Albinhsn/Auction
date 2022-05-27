using BidMicroService.Models;
using BidMicroService.RabbitMQ;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;

namespace BidMicroService.Services
{
    public class BidService
    {

        private readonly IMongoCollection<Bid> _bidCollection;
        
        private readonly RabbitMQConnection _connection;
        public BidService()
        {
            
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Bids");
            RabbitMQConnection connection = new();
            _connection = connection;            
            _bidCollection = db.GetCollection<Bid>("Bids");
        }

        public async Task<List<HighestBid>> GetAllAuctionsHighestBid()
        {
            var results = await _bidCollection.Aggregate()
                .Group(
                    x => x.AuctionId,
                    y => new
                    {
                        Id = y.Key,
                        Amount = y.Max(a => (int)a.Amount)
                    }
                ).ToListAsync();
            List<HighestBid> highestBids = new List<HighestBid>();
            foreach (var result in results)
            {
                HighestBid highestBid = new();
                highestBid.UserId = result.Id;
                highestBid.Amount = result.Amount;
                highestBids.Add(highestBid);
            }
            return highestBids;


        }

        public async Task<List<HighestBid>> GetLowestHighestBidFromListOfIds(List<string> Ids)
        {
            var results = await _bidCollection.Aggregate()
                .Match(Builders<Bid>.Filter.In(b => b.AuctionId, Ids)
                ).Group(x => x.AuctionId,
                    y => new
                    {
                        Id = y.Key,
                        Amount = y.Min(a => (int)a.Amount),
                    })
                .ToListAsync();
            List<HighestBid> highestBids = new List<HighestBid>();

            foreach (var result in results)
            {
                HighestBid highestBid = new();
                highestBid.Id = result.Id;
                highestBid.Amount = result.Amount;
                highestBids.Add(highestBid);

            }
            return highestBids;
        }
        public async Task<List<HighestBid>> GetHighestBidFromListOfIds(List<string> Ids)
        {
            Console.WriteLine(Ids);
            var results = await _bidCollection.Aggregate()
                .Match(Builders<Bid>.Filter.In(b => b.AuctionId, Ids)
                ).Group(x => x.AuctionId,
                    y => new
                    {
                        Id = y.Key,
                        Amount = y.Max(a => (int)a.Amount),
                    })
                .ToListAsync();

            List<HighestBid> highestBids = new List<HighestBid>();

            foreach (var result in results)
            {
                HighestBid highestBid = new();
                highestBid.UserId = result.Id;
                highestBid.Amount = result.Amount;
                highestBids.Add(highestBid);

            }
            return highestBids;
        }


        public List<Bid> GetAllBidsByAuction(string Id)
        {
            ObjectId aucId = new ObjectId(Id);
            Console.WriteLine(aucId);
            List<Bid> results = _bidCollection.Find(x => x.AuctionId == aucId.ToString()).ToList();


            return results;
        }

        public async Task<Bid> CreateBid(BidPostModel bid)
        {

            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId = getIdFromTokenProducer.GetIdFromToken(bid.Token);
            Bid b = new();
            b.AuctionId = bid.AuctionId;
            b.UserId = userId;
            IsBidderSellerProducer isBidderSellerProducer = new(_connection);
            if (isBidderSellerProducer.IsBidderSeller(b))
            {
                
                return null;
            }

            b = new();
            b.AuctionId = bid.AuctionId;
            b.UserId = userId;
            b.Id = ObjectId.GenerateNewId().ToString();
            b.Amount = bid.Amount;
            //Returns all current bids on auction
            await _bidCollection.InsertOneAsync(b);
            BidMadeWatchlistProducer producer = new(_connection);
            producer.BidMadeWatchlist(b);
            Console.WriteLine("Returning a successfull bid");
            return b;
        }

        public async Task<HighestBid> GetHighestBidOnAuction(string Id)
        {

            var results = await _bidCollection.Aggregate()
                .Match(Builders<Bid>.Filter.Eq(b => b.AuctionId, Id))
                .Sort(new BsonDocument
                    {
                        {"Amount", -1}
                    }).Limit(1).Project(
                        Builders<Bid>.Projection
                            .Include(b => b.UserId)
                            .Include(b => b.Amount)
                            .Exclude(b => b.Id)
                ).ToListAsync();
            HighestBid bid = new();
            Console.WriteLine(results.Count);
            foreach (var result in results)
            {

                bid.UserId = result["UserId"].ToString();
                bid.Amount = int.Parse(result["Amount"].ToString());
            }
            if (bid != null)
            {
                Console.WriteLine(bid.UserId);
                Console.WriteLine(bid.Amount);
            }

            return bid;
        }



    }
}
