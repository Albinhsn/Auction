const usersnames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]
let passwords = ["dump","support","listen","drain","deprivation","draw","chemistry","convert","wedding","experiment","quarrel","bounce","scream","reform","due","series","lunch","range","ice", "horn"]
let objs = []
var MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
async function connect(docs) {
    try {
        
        await client.connect();
        const database = client.db("Auctionista")
        const auctions = database.collection("users")
        const result = await auctions.insertMany(docs)

        console.log("inserted docs\n")
        console.log(result)
    } finally {
        await client.close();
    }
}



for(i = 0; i<usersnames.length; i++){
    let favo = []
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        favo.push(Math.floor(Math.random() * 30))
    }
    
    let obj = {
        Id: i+1,
        Name: usersnames[i],
        Email: `${usersnames[i]}@gmail.com`,
        Password: passwords[i],
        Favorites: favo
    }
    objs.push(obj)

}

connect(objs)

