
using AuctionMicroService.Models;
using AuctionMicroService.RabbitMQ;
using MongoDB.Bson;
using MongoDB.Driver;
using RabbitMQ.Client;
using System.Text.Json;

namespace AuctionMicroService.Services
{
    public class AuctionService
    {

        private readonly IMongoCollection<Auction> _auctionCollection;
        private readonly IMongoDatabase _database;
        private readonly GetAuctionBidsProducer _getAuctionBidsProducer;
        private readonly AllAuctionHighestBidProducer _allAuctionHighestBidProducer;
        private readonly AuctionEndedProducer _auctionEndedProducer;                
        private readonly HighestBidFromListOfIdsProducer _highestBidFromListOfIdsProducer;
        private readonly AuctionCreatedProducer _auctionCreatedProducer;
        private readonly GetIdFromTokenProducer _getIdFromTokenProducer;
        private readonly GetFavoritesFromUserProducer _getFavoritesFromUserProducer;
        private readonly GetLowestHighestBidFromListOfIdsProducer _getLowestHighestBidFromListOfIdsProducer;
        private readonly GetPostageProducer _getPostageProducer;    
        private readonly GetAuctionBySearchTagsProducer _getAuctionBySearchTagsProducer;
        private readonly GetUsernameFromListOfIdsProducer _getUsernameFromListOfIdsProducer;
        private GetAuctionTagsFromListOfIds _getAuctionTagsFromListOfIds;
        private RabbitMQConnection _connection;
        public AuctionService()
        {
            _connection = new();
            
            _getAuctionBidsProducer = new(_connection);
            _getAuctionBidsProducer = new(_connection);
            _allAuctionHighestBidProducer = new(_connection);            
            _getFavoritesFromUserProducer = new(_connection);
            _getIdFromTokenProducer = new(_connection);            
            _highestBidFromListOfIdsProducer = new(_connection);
            _auctionCreatedProducer = new(_connection);
            _getLowestHighestBidFromListOfIdsProducer = new(_connection);
            _getPostageProducer = new(_connection);
            _getAuctionBySearchTagsProducer = new(_connection);
            _getUsernameFromListOfIdsProducer = new(_connection);
            
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");
            _database = db;
            _auctionCollection = db.GetCollection<Auction>("Auctions");
            
        }

        public async void MadePurchase(string token, string auctionId)
        {
            
            Auction auction = await _auctionCollection.Find(x => x.Id == auctionId).FirstOrDefaultAsync();
            
            string userId = _getIdFromTokenProducer.GetIdFromToken(token);
            
            auction.Winner = userId;
            await UpdateAuction(auction, auctionId);
            AuctionPurchasedProducer _auctionPurchasedProducer = new(_connection);
            _auctionPurchasedProducer.AuctionPurchased(auction);
        }

        public async Task<string> GetAuctionNameFromId(string Id)
        {
            Auction auc = await _auctionCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            return auc.Name;
        }

        public async Task<List<Auction>> GetUserWatchlist(string token)
        {
            string userId =  _getIdFromTokenProducer.GetIdFromToken(token);
            GetUserWatchlistIdsProducer _getUserWatchlistProducer= new(_connection);
            Console.WriteLine(userId + "Got userId back C:");
            List<string> AuctionIds =_getUserWatchlistProducer.GetUserWatchlist(userId);
            Console.WriteLine("Got my auctionids");
            if(AuctionIds.Count > 0)
            {
                return await _auctionCollection.Find(x => AuctionIds.Contains(x.Id)).ToListAsync();
            }
            else
            {
                return new List<Auction>();
            }
            
        }

        public async Task<List<Auction>> GetAuctionsBySearch(string search)
        {
            List<Auction> auctionResult = new List<Auction>();
            //Query auc by name
            if(search == null)
            {
                auctionResult = GetAll().Result;
            }
            else
            {
                var filter = Builders<Auction>.Filter.Regex("Name", new BsonRegularExpression(search, "i"));
                auctionResult = await _auctionCollection.Aggregate()
                    .Match(filter)
                    .ToListAsync();
                //Query auc by tags 
                List<Tags> tagResults = _getAuctionBySearchTagsProducer.GetAuctionBySearchTags(search);

                //Join them and return
                foreach (var tagResult in tagResults)
                {
                    if (auctionResult.Any(x => x.Id == tagResult.Id))
                    { }
                    else
                    {
                        auctionResult.Add(await _auctionCollection.Find(x => x.Id == tagResult.Id).FirstOrDefaultAsync());
                    }
                }
            }
            
            //Replace seller id with name
            List<string> aucIds = new List<string>();
            List<string> sellerIds = new List<string>();
            foreach(var auction in auctionResult)
            {
                aucIds.Add(auction.Id);
                sellerIds.Add(auction.Seller);
            }
            _getAuctionTagsFromListOfIds = new(_connection);
            List<Tags> tags = _getAuctionTagsFromListOfIds.GetAuctionBySearchTags(aucIds);
            List<User> users = _getUsernameFromListOfIdsProducer.GetUsernameFromListOfIds(sellerIds);            
            foreach(var auction in auctionResult)
            {
                auction.Seller = users.Find(x => x.Id == auction.Seller).Name;
                auction.Tags = tags.Find(x => x.Id == auction.Id);
            }
            
            return auctionResult;
        }

        public async void AuctionEnded(string Id)
        {

        }
        public async Task<bool> IsBidderSeller(Bid bid)
        {
            Auction auc = await _auctionCollection.Find(x => x.Id == bid.AuctionId && x.Seller == bid.UserId).FirstOrDefaultAsync();
            if(auc != null)
            {
                return true;
            }
            else
            {
                return false;
            }
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
            int postage = _getPostageProducer.GetPostage(id);
            auc.Postage = postage;
            Console.WriteLine(JsonSerializer.Serialize<List<Bid>>(bids));
            auc.Bids = bids;
            return auc;
        }


        public async Task<AuctionDatabaseModel> CreateAuction(AuctionPostModel auc)
        {
            //TODO Check valid Auction
            Console.WriteLine("GOT");
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
            Console.WriteLine("GOT");
            IMongoCollection<AuctionDatabaseModel> collection = _database.GetCollection<AuctionDatabaseModel>("Auctions");
            await collection.InsertOneAsync(newAuc);
            Console.WriteLine("GOT");
            auc.Id = newAuc.Id;
            _auctionCreatedProducer.AuctionCreated(auc);
            Console.WriteLine("GOT");

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
