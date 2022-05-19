using AuctionMicroService.Models;
using AuctionMicroService.RabbitMQ;
using BidMicroService.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;

namespace AuctionMicroService.Services
{
    public class AuctionService
    {

        private readonly IMongoCollection<Auction> _auctionCollection;
        private readonly MessageProducer _messageProducer;
        private readonly HighestBidFromListOfIdsProducer _highestBidFromListOfIdsProducer;

        public AuctionService(MessageProducer messageProducer, HighestBidFromListOfIdsProducer highestBidFromListOfIdsProducer)
        {
            _messageProducer = messageProducer; 
            _highestBidFromListOfIdsProducer = highestBidFromListOfIdsProducer; 
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");

            _auctionCollection = db.GetCollection<Auction>("Auctions");
        }

        public async void MadePurchase(string userId, string auctionId)
        {
            Auction auction = await _auctionCollection.Find(x => x.Id == auctionId).FirstOrDefaultAsync();
            auction.Winner = new ObjectId(userId).ToString();
            UpdateAuction(auction, auctionId);
            _messageProducer.MadePurchase(auction);
        }

        public async void AuctionEnded(string Id)
        {

        }

        public async Task<List<Auction>> GetUserAuctions(string Id)
        {
            List<string> Ids = new List<string>();
            List<Auction> userAuctions = await _auctionCollection.Find(x => x.Seller == Id).ToListAsync();
            foreach (Auction auction in userAuctions)
            {
                Ids.Add(auction.Id);
            }
            
            List<HighestBid> highestBids = _highestBidFromListOfIdsProducer.GetHighestBidFromListOfIds(Ids);
            for(var i = 0; i<userAuctions.Count; i++)
            {
                HighestBid highestBid = highestBids.Find(x => x.AuctionId == userAuctions[i].Id);
                if (highestBid != null)
                {
                    userAuctions[i].HighestBid = highestBid.Amount;
                }
            }

            return userAuctions;
        }


        public async Task<List<Auction>> GetAll()
        {
            List<HighestBid> highestBids = _messageProducer.GetAllAuctionBids();                        
            List<Auction> auctions = await _auctionCollection.Find(_  => true).ToListAsync();            
            for(var i = 0; i<auctions.Count; i++)
            {                                    
                HighestBid highestBid = highestBids.Find(x => x.AuctionId == auctions[i].Id);
                
                if(highestBid != null)
                {                    
                    auctions[i].HighestBid = highestBid.Amount;            
                }
            }
            return auctions;
        }

        public async Task<Auction> GetAuction(ObjectId id)
        {
            
            Auction auc = await _auctionCollection.Find(x => x.Id == id.ToString()).FirstOrDefaultAsync();
            List<Bid> bids = _messageProducer.GetAuctionBids(id.ToString());
            Console.WriteLine(JsonSerializer.Serialize<List<Bid>>(bids));
            auc.Bids = bids;
            return auc;
        }


        public Auction CreateAuction(AuctionPostModel auc)
        {
            //TODO Check valid Auction
            Auction newAuc = new();
            newAuc.Id = new ObjectId().ToString();
            newAuc.AuctionType = auc.AuctionType;
            newAuc.Condition = auc.Condition;
            newAuc.Description = auc.Description;
            newAuc.EndDate = DateTime.Now.AddDays(7);
            newAuc.MinimumBid = auc.MinimumBid;
            newAuc.Name = auc.Name;                        
            newAuc.StartDate = DateTime.Now;            
            newAuc.State = "Pågående";
            newAuc.Seller = auc.Seller.ToString();
            newAuc.PurchasePrice = auc.PurchasePrice;            
            newAuc.Winner = null;

            
            _auctionCollection.InsertOne(newAuc);

            return newAuc;
        }

        public async Task<Auction> UpdateAuction(Auction auc, string Id)
        {
            auc.Id = new ObjectId(Id).ToString();
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
                await _auctionCollection.DeleteOneAsync(x => x.Id == id.ToString());
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
