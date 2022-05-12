using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace ImageMicroservice.Services
{
    public class ImageService
    {
        private readonly GridFSBucket _bucket;

        public ImageService()
        {
            MongoClient client = new("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            IMongoDatabase database = client.GetDatabase("Images");
            _bucket = new GridFSBucket(database);
        }


        public async Task<ObjectId> saveImage(IFormFile file)
        {
            Stream source = file.OpenReadStream();      
            ObjectId id = await _bucket.UploadFromStreamAsync(file.FileName, source);
            source.Close();
            return id;

        }

        public async Task<bool> DeleteImage(ObjectId Id)
        {
            try
            {
                await _bucket.DeleteAsync(Id);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }           
        } 
        public async Task<Byte[]> GetImage(string id)
        {
            ObjectId _id = new ObjectId(id);
            
            Byte[] b = await _bucket.DownloadAsBytesAsync(_id);
            
            return b;
        }
    }
}
