using AuctionMicroService.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AuctionMicroService.Services
{
    public class AuctionService
    {

        private readonly IMongoCollection<Auction> _auctionCollecion;

        public AuctionService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");

            _auctionCollecion = db.GetCollection<Auction>("Auctions");
        }

        public async Task<List<Auction>> GetAll()
        {
            return await _auctionCollecion.Find(_  => true).ToListAsync();
        }

        public async Task<Auction> GetAuction(ObjectId id)
        {
            return await _auctionCollecion.Find(x => x.Id == id).FirstOrDefaultAsync();
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

            
            _auctionCollecion.InsertOne(newAuc);

            return newAuc;
        }

        public async Task<Auction> UpdateAuction(Auction auc)
        {
            var auction = await _auctionCollecion.FindOneAndUpdateAsync(
                Builders<Auction>.Filter.Where(x => x.Id == auc.Id),
                Builders<Auction>.Update
                    .Set(x => x, auc),
                options: new FindOneAndUpdateOptions<Auction>
                {
                    ReturnDocument = ReturnDocument.After
                }
                ).ConfigureAwait(false);

            return auction;
        }

        public async Task<bool> DeleteAuction(ObjectId id)
        {
            try
            {
                await _auctionCollecion.DeleteOneAsync(x => x.Id == id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<Auction> GetAuctionsSortedLimited(string sort, int direction, int limitedBy)
        {           
            List<Auction> results = _auctionCollecion.Aggregate()
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
