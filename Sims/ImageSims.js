const { MongoClient, GridFSBucket} = require('mongodb')
var fs = require('fs')

imageUrls = [

]
imageNames = [

]
const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)
const db = client.db("Auctionista")
const bucket = new GridFSBucket(db)
for(let i = 0; i<imageUrls.length;i++){
    fs.createReadStream(imageUrls[i])
        .pipe(bucket.openUploadStream(imageNames[i], {
            chunkSizeBytes: 1048576,
            metadata: {}
        }))
}

