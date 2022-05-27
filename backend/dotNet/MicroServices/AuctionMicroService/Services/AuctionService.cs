
using AuctionMicroService.Helpers;
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
       
        private RabbitMQConnection _connection;
        public AuctionService()
        {
            _connection = new();
            
            
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Auctions");
            _database = db;
            _auctionCollection = db.GetCollection<Auction>("Auctions");
            
        }

        public async Task<Auction> MadePurchase(string token, string auctionId)
        {
            
            Auction auction = await _auctionCollection.Find(x => x.Id == auctionId).FirstOrDefaultAsync();
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId = getIdFromTokenProducer.GetIdFromToken(token);
            
            auction.Winner = userId;
            auction.State = "Slut";
            
            await UpdateAuction(auction, auctionId);
            AuctionPurchasedProducer _auctionPurchasedProducer = new(_connection);
            _auctionPurchasedProducer.AuctionPurchased(auction);
            return auction;
        }

        public async Task<string> GetAuctionNameFromId(string Id)
        {
            Auction auc = await _auctionCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
            return auc.Name;
        }

        public async Task<List<Auction>> GetUserWatchlist(string token)
        {
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string userId =  getIdFromTokenProducer.GetIdFromToken(token);
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
                GetAuctionBySearchTagsProducer getAuctionBySearchTagsProducer = new(_connection);
                List<Tags> tagResults = getAuctionBySearchTagsProducer.GetAuctionBySearchTags(search);

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
            
            GetAuctionTagsFromListOfIds getAuctionTagsFromListOfIds = new(_connection);
            List<Tags> tags = getAuctionTagsFromListOfIds.GetAuctionBySearchTags(aucIds);

            GetUsernameFromListOfIdsProducer getUsernameFromListOfIdsProducer= new(_connection);
            List<User> users = getUsernameFromListOfIdsProducer.GetUsernameFromListOfIds(sellerIds);            
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
            HighestBidFromListOfIdsProducer highestBidFromListOfIdsProducer = new(_connection);
            List<HighestBid> highestBids = highestBidFromListOfIdsProducer.GetHighestBidFromListOfIds(Ids);
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
            AllAuctionHighestBidProducer allAuctionHighestBidProducer = new(_connection);
            List<HighestBid> highestBids = allAuctionHighestBidProducer.GetAllAuctionBids();                        
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
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string id = getIdFromTokenProducer.GetIdFromToken(token);

            GetFavoritesFromUserProducer getFavoritesFromUserProducer = new(_connection);
            List<string> favorites = getFavoritesFromUserProducer.GetFavoritesFromUser(id);
            Console.WriteLine(favorites);
            return await _auctionCollection.Find(x => favorites.Contains(x.Id)).ToListAsync();
            
        }
        public async Task<Auction> GetAuction(string id)
        {
            
            Auction auc = await _auctionCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            GetAuctionBidsProducer getAuctionBidsProducer = new(_connection);
            List<Bid> bids = getAuctionBidsProducer.GetAuctionBids(id.ToString());
            if(bids.Count > 0)
            {
                auc.HighestBid = bids[bids.Count - 1].Amount;
            }

            GetPostageProducer getPostageProducer = new(_connection);
            int postage = getPostageProducer.GetPostage(id);
            auc.Postage = postage;
            Console.WriteLine(JsonSerializer.Serialize<List<Bid>>(bids));
            auc.Bids = bids;
            return auc;
        }


        public async Task<string> CreateAuction(AuctionPostModel auc)
        {
            
            
            AuctionDatabaseModel newAuc = new();
            GetIdFromTokenProducer getIdFromTokenProducer = new(_connection);
            string Seller = getIdFromTokenProducer.GetIdFromToken(auc.SellerToken);
            if(Seller == null)
            {
                return null;
            }
            AuctionValidationHelpers helper = new();
            auc = helper.ValidateImages(auc);
            newAuc.Id = ObjectId.GenerateNewId().ToString();            
            newAuc.AuctionType = auc.AuctionType;
            newAuc.Condition = auc.Condition;
            newAuc.Description = auc.Description;
            newAuc.EndDate = DateTime.Now.AddDays(7);
            newAuc.Images = auc.Images;
            newAuc.MinimumBid = auc.MinimumBid;
            newAuc.Name = auc.Name;                        
            newAuc.StartDate = DateTime.Now;            
            newAuc.State = "Pågående";
            newAuc.Seller = Seller;
            newAuc.PurchasePrice = auc.PurchasePrice;            
            newAuc.Winner = null;
            
            
            IMongoCollection<AuctionDatabaseModel> collection = _database.GetCollection<AuctionDatabaseModel>("Auctions");
            await collection.InsertOneAsync(newAuc);
            
            auc.Id = newAuc.Id;
            AuctionCreatedProducer auctionCreatedProducer = new(_connection);
            auctionCreatedProducer.AuctionCreated(auc);
            
           
            return newAuc.Id;
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
                .Match(x => x.State != "Slut" && x.PurchasePrice > 0)
                .Sort("{PurchasePrice: 1}")
                .Limit(5)
                .ToListAsync();
            Console.WriteLine(results.Count);
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
            GetLowestHighestBidFromListOfIdsProducer getLowestHighestBidFromListOfIdsProducer = new(_connection);
            List<HighestBid> highestBids = getLowestHighestBidFromListOfIdsProducer.GetLowestHighestBidsLimited(Ids);


            List<Auction> miniAuctions = new ();
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
