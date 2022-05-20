using BidMicroService.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;

namespace BidMicroService.Controllers
{
    public class BidService
    {

        private readonly IMongoCollection<Bid> _bidCollection;
        public BidService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Bids");

            _bidCollection = db.GetCollection<Bid>("Bids");
        }

        public async Task<List<HighestBid>> GetAllAuctionsHighestBid()
        {
            var results = await _bidCollection.Aggregate()
                .Group(
                    x => x.AuctionId,
                    y => new {
                        Id = y.Key,
                        Amount = y.Max(a => (int)a.Amount) 
                    }                                                                  
                ).ToListAsync();
            List<HighestBid> highestBids = new List<HighestBid>();  
            foreach(var result in results)
            {
                HighestBid highestBid = new();
                highestBid.UserId = result.Id;
                highestBid.Amount = result.Amount;
                highestBids.Add(highestBid);
            }                         
            return highestBids;
          
            
        }

        public async Task<List<HighestBid>> GetLowestHighestBidFromListOfIds(List<string>Ids)
        {
            var results = await _bidCollection.Aggregate()
                .Match(Builders<Bid>.Filter.In(b => b.AuctionId, Ids)
                ).Group(x => x.AuctionId,
                    y => new {
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
        public async Task<List<HighestBid>> GetHighestBidFromListOfIds(List<string>Ids)
        {
            Console.WriteLine(Ids);
            var results = await _bidCollection.Aggregate()
                .Match(Builders<Bid>.Filter.In(b => b.AuctionId, Ids)              
                ).Group(x => x.AuctionId,
                    y => new {
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

        public List<Bid>CreateBid(BidPostModel bid)
        {
            Bid b = new Bid();
            b.AuctionId = new ObjectId(bid.AuctionId).ToString();
            b.UserId = new ObjectId(bid.UserId).ToString();
            b.Id = new ObjectId().ToString();
            b.Amount = bid.Amount;
            //Returns all current bids on auction
            _bidCollection.InsertOneAsync(b).Wait();
            return GetAllBidsByAuction(bid.AuctionId); 
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
            foreach(var result in results)
            {

                bid.UserId = result["UserId"].ToString();
                bid.Amount = int.Parse(result["Amount"].ToString());
            }
            if(bid != null)
            {
                Console.WriteLine(bid.UserId);
                Console.WriteLine(bid.Amount);
            }
            
            return bid;
        }

        
 
    }
}
