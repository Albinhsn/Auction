using AuctionMicroService.Models;
using AuctionMicroService.RabbitMQ;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AuctionMicroService.Services
{
    public class AuctionService
    {

        private readonly IMongoCollection<Auction> _auctionCollection;
        private readonly MessageProducer _messageSender;

        public AuctionService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");

            _auctionCollection = db.GetCollection<Auction>("Auctions");
        }

        public async void MadePurchase(string userId, string auctionId)
        {
            Auction auction = await _auctionCollection.Find(x => x.Id == new ObjectId(auctionId)).FirstOrDefaultAsync();
            auction.Winner = new ObjectId(userId);
            UpdateAuction(auction, auctionId);
            _messageSender.MadePurchase(auction);
        }


        public async Task<List<Auction>> GetAll()
        {
            return await _auctionCollection.Find(_  => true).ToListAsync();
        }

        public async Task<Auction> GetAuction(ObjectId id)
        {
            return await _auctionCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public Auction CreateAuction(AuctionPostModel auc)
        {
            //TODO Check valid Auction
            Auction newAuc = new();
            newAuc.Id = new ObjectId();
            newAuc.AuctionType = auc.AuctionType;
            newAuc.Condition = auc.Condition;
            newAuc.Description = auc.Description;
            newAuc.EndDate = DateTime.Now.AddDays(7);
            newAuc.MinimumBid = auc.MinimumBid;
            newAuc.Name = auc.Name;                        
            newAuc.StartDate = DateTime.Now;            
            newAuc.State = "Pågående";
            newAuc.Seller = auc.Seller;
            newAuc.PurchasePrice = auc.PurchasePrice;            
            newAuc.Winner = null;

            
            _auctionCollection.InsertOne(newAuc);

            return newAuc;
        }

        public async Task<Auction> UpdateAuction(Auction auc, string Id)
        {
            auc.Id = new ObjectId(Id);
            var filter = Builders<Auction>.Filter.Where(x => x.Id == auc.Id);
            var options = new FindOneAndReplaceOptions<Auction>
            {
                ReturnDocument = ReturnDocument.After
            };

            var result = await _auctionCollection.FindOneAndReplaceAsync<Auction>(x => x.Id == auc.Id, auc, options);                      
            return auc;
        }

        public async Task<bool> DeleteAuction(ObjectId id)
        {
            try
            {
                await _auctionCollection.DeleteOneAsync(x => x.Id == id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<Auction> GetAuctionsSortedLimited(string sort, int direction, int limitedBy)
        {           
            List<Auction> results = _auctionCollection.Aggregate()
                .Sort(new BsonDocument
                    {
                        { sort, direction}
                    }
                )
                .Limit(limitedBy).ToList();
            return results;
        }
    }
}
