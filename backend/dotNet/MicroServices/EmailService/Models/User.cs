﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EmailService.Models
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Email { get; set; }
    }
}
