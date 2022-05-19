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
                highestBids.Add(new HighestBid(result.Id, result.Amount));
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

        public async Task<BsonDocument> GetHighestBidOnAuction(string Id)
        {
            ObjectId aucId = new ObjectId(Id);
            List<BsonDocument> result = await _bidCollection.Aggregate()
                .Match(new BsonDocument
                    {
                        { "AuctionId", aucId}
                    }).Sort(new BsonDocument
                    {
                        {"Amount", -1}
                    }).Limit(1).Project(
                    new BsonDocument
                    {
                        {"_id", 0},
                        {"HighestBid", 1}
                    }
                ).ToListAsync();
            try
            {
                return result[0];
            }catch (Exception ex)
            {
                return null;
            }

        }

        
 
    }
}
