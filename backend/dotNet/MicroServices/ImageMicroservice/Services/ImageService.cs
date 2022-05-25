using ICSharpCode.Decompiler.Metadata;
using ImageMicroservice.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace ImageMicroservice.Services
{
    public class ImageService
    {
        private readonly GridFSBucket _bucket;
        private readonly IMongoCollection<GridFSFile> _collection;

        public ImageService()
        {
            MongoClient client = new("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            IMongoDatabase database = client.GetDatabase("Images");
            _bucket = new GridFSBucket(database);
            _collection = database.GetCollection<GridFSFile>("fs.files");
        }


        public async Task<string> saveImage(IFormFile file)
        {
            Stream source = file.OpenReadStream();
            
            ObjectId id = await _bucket.UploadFromStreamAsync(file.FileName, source);
            var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", id);
            
            GridFSFileInfo fileInfo = await _bucket.Find(filter).FirstOrDefaultAsync();
            GridFSFile gridFSFile = new();
            gridFSFile.Id = fileInfo.Id.ToString();
            gridFSFile.length = fileInfo.Length;
            gridFSFile.chunkSize = fileInfo.ChunkSizeBytes;
            gridFSFile.uploadDate = fileInfo.UploadDateTime;
            gridFSFile.filename = fileInfo.Filename;
            
            Metadata metadata = new Metadata();
            metadata._contentType = file.ContentType;
            gridFSFile.metadata = metadata;


            
            
            
            
            var filterFile = Builders<GridFSFile>.Filter.Where(x => x.Id == gridFSFile.Id);
            var options = new FindOneAndReplaceOptions<GridFSFile>
            {
                ReturnDocument = ReturnDocument.After
            };
            
            var result = await _collection.FindOneAndReplaceAsync<GridFSFile>(filterFile, gridFSFile, options);
            source.Close();
            return id.ToString();

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
        public async Task<ImageFile> GetImage(string id)
        {
            
            
            GridFSFile gridFSFile = await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
            Byte[] b = await _bucket.DownloadAsBytesAsync(new ObjectId(id));
            ImageFile imageFile = new();
            imageFile.File = b;
            imageFile.FileType = gridFSFile.metadata._contentType;
            
            
            return imageFile;
        }

        public async Task<List<ObjectId>> GetImagesFromAuctionId(string Id)
        {
            ObjectId objId = new ObjectId(Id);
            //TODO Create connection and find every ObjectId of image from AuctionId
            return null;
        } 
    }
}
