using MongoDB.Bson;
using MongoDB.Driver;
using TagsMicroService.Models;

namespace TagsMicroService.Services
{
    public class TagsService
    {
        IMongoCollection<Models.Tag> _collection;
        public TagsService()
        {
            MongoClient client = new MongoClient("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Tags");
            _collection = db.GetCollection<Models.Tag>("Tags");
        }


        public async Task<Models.Tag> GetTagsFromAuction(string Id)
        {
            return await _collection.Find(x => x.Id == Id).FirstOrDefaultAsync();
        }
        public async Task<List<Models.Tag>> GetAuctionTagsFromListOfIds(List<string> Ids)
        {
            return await _collection.Find(x => Ids.Contains(x.Id)).ToListAsync();

        }

        public async void AuctionCreated(Models.Tag auc)
        {
            Console.WriteLine(auc.Id);
            await _collection.InsertOneAsync(auc);
        }
        public async Task<List<Models.Tag>> GetAuctionBySearchTags(string search)
        {
            
            var filterBrand = Builders<Models.Tag>.Filter.Regex("Brand", new BsonRegularExpression(search, "i"));
            var filterType = Builders<Models.Tag>.Filter.Regex("Type", new BsonRegularExpression(search, "i"));
            var filterLens= Builders<Models.Tag>.Filter.Regex("Lens", new BsonRegularExpression(search, "i"));
            var filterDescription = Builders<Models.Tag>.Filter.Regex("Description", new BsonRegularExpression(search, "i"));

            List<Models.Tag> brandResults = await _collection.Aggregate()
                .Match(filterBrand)
                .ToListAsync();

            List<Models.Tag> typeResults = await _collection.Aggregate()
                .Match(filterType)
                .ToListAsync();

            List<Models.Tag> lensResults = await _collection.Aggregate()
                .Match(filterLens)
                .ToListAsync();

            List<Models.Tag> descriptionResults = await _collection.Aggregate()
                .Match(filterDescription)
                .ToListAsync();



            List<Models.Tag> results = new();
            foreach (var brand in brandResults)
            {
                if(results.Find(x => x.Id == brand.Id) == null)
                {
                    results.Add(brand);
                } 
            }
            foreach (var type in typeResults)
            {
                if (results.Find(x => x.Id == type.Id) == null)
                {
                    results.Add(type);
                }
            }
            foreach (var lens in lensResults)
            {
                if (results.Find(x => x.Id == lens.Id) == null)
                {
                    results.Add(lens);
                }
            }
            foreach (var description in descriptionResults)
            {
                if (results.Find(x => x.Id == description.Id) == null)
                {
                    results.Add(description);
                }
            }
            Console.WriteLine(results.Count);
            return results;
        }
    }
}
