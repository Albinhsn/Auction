using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuctionMicroService.Models
{
    public class Tags
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string? Brand { get; set; }
        public string? Type { get; set; }
        public string? Lens { get; set; }
        public string? ImageSensorSize { get; set; }
        public string? Resolution { get; set; }
        public string? WeatherProof { get; set; }
        public string? VideoFormat { get; set; }
        public List<string>? MemoryCards { get; set; }
        public List<string>? WirelessConnection { get; set; }
        public string? AngledScreen { get; set; }
    }
}
