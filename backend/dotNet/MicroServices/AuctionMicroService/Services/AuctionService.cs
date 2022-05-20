
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
        private readonly GetAuctionBidsProducer _getAuctionBidsProducer;
        private readonly AllAuctionHighestBidProducer _allAuctionHighestBidProducer;
        private readonly AuctionEndedProducer _auctionEndedProducer;
        private readonly AuctionPurchasedProducer _auctionPurchasedProducer;        
        private readonly HighestBidFromListOfIdsProducer _highestBidFromListOfIdsProducer;
        private readonly AuctionCreatedProducer _auctionCreatedProducer;
        private readonly GetIdFromTokenProducer _getIdFromTokenProducer;
        private readonly GetFavoritesFromUserProducer _getFavoritesFromUserProducer;
        private readonly GetLowestHighestBidFromListOfIds _getLowestHighestBidFromListOfIdsProducer;
        public AuctionService()
        {
            _getAuctionBidsProducer = new();
            _getAuctionBidsProducer = new();
            _allAuctionHighestBidProducer = new();            
            _getFavoritesFromUserProducer = new();
            _getIdFromTokenProducer = new();            
            _highestBidFromListOfIdsProducer = new();
            _auctionCreatedProducer = new();
            _getLowestHighestBidFromListOfIdsProducer = new();

            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");

            _auctionCollection = db.GetCollection<Auction>("Auctions");
            
        }

        public async void MadePurchase(string userId, string auctionId)
        {
            Auction auction = await _auctionCollection.Find(x => x.Id == auctionId).FirstOrDefaultAsync();
            auction.Winner = new ObjectId(userId).ToString();
            UpdateAuction(auction, auctionId);
            _auctionPurchasedProducer.AuctionEnded(auctionId);
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
                HighestBid highestBid = highestBids.Find(x => x.Id == userAuctions[i].Id);
                if (highestBid != null)
                {
                    userAuctions[i].HighestBid = highestBid.Amount;
                }
            }

            return userAuctions;
        }


        public async Task<List<Auction>> GetAll()
        {
            List<HighestBid> highestBids = _allAuctionHighestBidProducer.GetAllAuctionBids();                        
            List<Auction> auctions = await _auctionCollection.Find(_  => true).ToListAsync();            
            for(var i = 0; i<auctions.Count; i++)
            {                                    
                HighestBid highestBid = highestBids.Find(x => x.Id == auctions[i].Id);
                
                if(highestBid != null)
                {                    
                    auctions[i].HighestBid = highestBid.Amount;            
                }
            }
            return auctions;
        }
        public async Task<List<Auction>> GetFavorites(string token)
        {
            string id = _getIdFromTokenProducer.GetIdFromToken(token);
            Console.WriteLine(id);
            List<string> favorites = _getFavoritesFromUserProducer.GetFavoritesFromUser(id);
            Console.WriteLine(favorites);
            return await _auctionCollection.Find(x => favorites.Contains(x.Id)).ToListAsync();
            
        }
        public async Task<Auction> GetAuction(string id)
        {
            
            Auction auc = await _auctionCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            List<Bid> bids = _getAuctionBidsProducer.GetAuctionBids(id.ToString());
            Console.WriteLine(JsonSerializer.Serialize<List<Bid>>(bids));
            auc.Bids = bids;
            return auc;
        }


        public AuctionDatabaseModel CreateAuction(AuctionPostModel auc, int volume, int weight)
        {
            //TODO Check valid Auction
            AuctionDatabaseModel newAuc = new();                        
            newAuc.Id = ObjectId.GenerateNewId().ToString();            
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
            PostageAuction postAuc = new();
            postAuc.Id = newAuc.Id;
            postAuc.Volume = volume;
            postAuc.Weight = weight;
            _auctionCreatedProducer.sendAuctionCreatedMessage(postAuc);
            

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

        public async Task<bool> DeleteAuction(string id)
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
        public async Task<List<Auction>> GetCheapestPurchasePrice()
        {
            List<Auction> results = await _auctionCollection.Aggregate()
                .Match(x => x.State != "slut" && x.PurchasePrice > 0)
                .Sort("{purchasePrice: 1}")
                .Limit(5)
                .ToListAsync();
            return results;
        }

        public async Task<List<Auction>> GetCheapestBids()
        {
            List<Auction> auctions = await _auctionCollection.Aggregate()
                .Match(x => x.State != "Slut" && x.MinimumBid > 0).ToListAsync();
            List<string> Ids = new List<string>();
            foreach (var au in auctions)
            {
                Ids.Add(au.Id);
            }
            List<HighestBid> highestBids = _getLowestHighestBidFromListOfIdsProducer.GetLowestHighestBidsLimited(Ids);


            List<Auction> miniAuctions = new List<Auction>();
            for (var i = 0; i < auctions.Count; i++)
            {
                HighestBid highestBid = highestBids.Find(x => x.Id == auctions[i].Id);
                
                if (highestBid != null )
                {
                    if(highestBid.Amount > 0)
                    {
                        auctions[i].HighestBid = highestBid.Amount;
                        miniAuctions.Add(auctions[i]);
                    }                    
                }               
            }
            List<Auction> results = miniAuctions.OrderBy(x => x.HighestBid).ToList();
            if(results.Count > 5)
            {
                return results.Take(5).ToList();
            }
            return results;            
        }

        public async Task<List<Auction>> GetShortestTimeRemaining()
        {
            List<Auction> auctions = await _auctionCollection.Aggregate()
                .Match(x => x.State != "Slut")
                .Sort("{EndDate: 1}")
                .Limit(5)
                .ToListAsync();
            foreach(var auc in auctions)
            {
                Console.WriteLine(auc.EndDate);
            }
            return auctions;
        }
        public async Task<List<Auction>> GetAuctionsSortedLimited(string sort, int direction, int limitedBy)
        {           
            List<Auction> results = await _auctionCollection.Aggregate()
                .Match(x => x.State != "Slut")
                .Sort(new BsonDocument
                    {
                        { sort, direction}
                    }
                )
                .Limit(limitedBy).ToListAsync();
            return results;
        }
    }
}
