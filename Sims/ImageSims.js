const { MongoClient, GridFSBucket, ObjectId} = require('mongodb')
const mongodb = require('mongodb')
const assert = require('assert')
var fs = require('fs')
let ids = [
    ObjectId('625d5bf754ce7f62ae79b40d'),
    ObjectId('625d5c0454ce7f62ae79b40f'),
    ObjectId('625d5b9854ce7f62ae79b3fe'),
    ObjectId('625d5baa54ce7f62ae79b401'),
    ObjectId('625d5bb754ce7f62ae79b403'),
    ObjectId('625d5bc454ce7f62ae79b405'),
    ObjectId('625d5c3354ce7f62ae79b415'),
    ObjectId('625d5c3e54ce7f62ae79b417'),
    ObjectId('625d598839d4f06f9a7e59d8'),
    ObjectId('625d5a243b6a3878b1da9fc0'),
    ObjectId('625d5c6254ce7f62ae79b420'),
    ObjectId('625d5c6f54ce7f62ae79b422'),
    ObjectId('625d5d2d54ce7f62ae79b43f'),
    ObjectId('625d5d3854ce7f62ae79b441'),
    ObjectId('625d5d4454ce7f62ae79b444'),
    ObjectId('625d5d5154ce7f62ae79b446'),
    ObjectId('625d5d5e54ce7f62ae79b448'),
    ObjectId('625d5d6854ce7f62ae79b44a'),
    ObjectId('625d5c1454ce7f62ae79b411'),
    ObjectId('625d5c2254ce7f62ae79b413'),
    ObjectId('625d5ced54ce7f62ae79b43b'),
    ObjectId('625d5cfd54ce7f62ae79b43d'),
    ObjectId('625d5c9454ce7f62ae79b428'),
    ObjectId('625d5c9f54ce7f62ae79b42c'),
    ObjectId('625d5cbf54ce7f62ae79b433'),
    ObjectId('625d5cca54ce7f62ae79b435'),
    ObjectId('625d5c4b54ce7f62ae79b419'),
    ObjectId('625d5c5654ce7f62ae79b41b'),
    ObjectId('625d5cd554ce7f62ae79b437'),
    ObjectId('625d5ce254ce7f62ae79b439'),
    ObjectId('625d5c7c54ce7f62ae79b424'),
    ObjectId('625d5c8854ce7f62ae79b426'),
    ObjectId('625d5cab54ce7f62ae79b42f'),
    ObjectId('625d5cb454ce7f62ae79b431'),
    ObjectId('625d5bd954ce7f62ae79b409'),
    ObjectId('625d5be754ce7f62ae79b40b'),
    ObjectId("625d58268cdfe43a88040e59"),
    ObjectId("625d5905a116036a983f6b21"),
    ObjectId('625d5d7354ce7f62ae79b44c'),
    ObjectId('625d5d7d54ce7f62ae79b44e'),
    ObjectId('625d5a6ee245c365b07af0a8'),
    ObjectId('625d5b7b54ce7f62ae79b3fc')
]
const dir = "./kamerabilder"
const files = fs.readdirSync(dir)
const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongodb.MongoClient.connect(uri, function (error, client) {
    assert.ifError(error);

  
    const db = client.db("Images")
    var bucket = new GridFSBucket(db)
    for (let i = 0; i < files.length; i++) {
        fs.createReadStream(dir + "/" + files[i])
            .pipe(bucket.openUploadStreamWithId(ids[i], files[i], {
                chunkSizeBytes: 1048576,
                metadata: {
                    _contentType: "image/jpeg" 
                }
            })).on('error', function (error) {
                assert.ifError(error);
            }).
                on('finish', function () {
                    console.log('done!');
                });
        console.log(i)
    }
    
})