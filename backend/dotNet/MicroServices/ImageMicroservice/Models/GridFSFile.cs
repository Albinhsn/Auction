using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ImageMicroservice.Models;
namespace ImageMicroservice.Models
{
    public class GridFSFile
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long length { get; set; }
        public int chunkSize { get; set; }
        public DateTime uploadDate { get; set; }
        public string filename { get; set; }
        public Metadata metadata { get; set;}

    }
}
