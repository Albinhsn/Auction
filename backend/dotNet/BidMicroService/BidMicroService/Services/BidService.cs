using BidMicroService.Models;
using MongoDB.Bson;
using MongoDB.Driver;

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

        //public List<Bid> GetAllBidsByObjectId(string Id)
        //{
            
        //}

        public List<Bid> GetAllBidsByAuction(string Id)
        {
            ObjectId aucId = new ObjectId(Id);
            List<Bid> results = _bidCollection.Aggregate()
                .Match(new BsonDocument
                    {
                        { "AuctionId", aucId}
                    }
                ).ToList();
            return results;
        }

        public List<Bid>CreateBid(BidPostModel bid)
        {
            Bid b = new Bid();
            b.AuctionId = new ObjectId(bid.AuctionId);
            b.UserId = new ObjectId(bid.UserId);
            b.Id = new ObjectId();
            b.Amount = bid.Amount;
            //Returns all current bids on auction
            _bidCollection.InsertOneAsync(b).Wait();
            return GetAllBidsByAuction(bid.AuctionId); 
        }

        public Bid GetHighestBidOnAuction(string Id)
        {
            ObjectId aucId = new ObjectId(Id);
            List<Bid> result = _bidCollection.Aggregate()
                .Match(new BsonDocument
                    {
                        { "AuctionId", aucId}
                    }).Sort(new BsonDocument
                    {
                        {"Amount", -1}
                    }).Limit(1).ToList();
                ;
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
