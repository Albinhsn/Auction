using MongoDB.Driver.GridFS;

namespace ImageMicroservice.Models
{
    public class ImageFile
    {        
        public string? FileType { get; set; }
        public byte[]? File { get; set; }
    }
}
