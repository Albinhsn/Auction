const usersnames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]
let passwords = ["dump","support","listen","drain","deprivation","draw","chemistry","convert","wedding","experiment","quarrel","bounce","scream","reform","due","series","lunch","range","ice", "horn"]
let objs = []
const { ObjectId } = require('mongodb');
let _id = [
    ObjectId("6246eaaafb49cf2ed543fd5f"),
    ObjectId("6246eaaafb49cf2ed543fd60"),
    ObjectId("6246eaaafb49cf2ed543fd61"),
    ObjectId("6246eaaafb49cf2ed543fd62"),
    ObjectId("6246eaaafb49cf2ed543fd63"),
    ObjectId("6246eaaafb49cf2ed543fd64"),
    ObjectId("6246eaaafb49cf2ed543fd65"),
    ObjectId("6246eaaafb49cf2ed543fd66"),
    ObjectId("6246eaaafb49cf2ed543fd67"),
    ObjectId("6246eaaafb49cf2ed543fd68"),
    ObjectId("6246eaaafb49cf2ed543fd69"),
    ObjectId("6246eaaafb49cf2ed543fd6a"),
    ObjectId("6246eaaafb49cf2ed543fd6b"),
    ObjectId("6246eaaafb49cf2ed543fd6c"),
    ObjectId("6246eaaafb49cf2ed543fd6d"),
    ObjectId("6246eaaafb49cf2ed543fd6e"),
    ObjectId("6246eaaafb49cf2ed543fd6f"),
    ObjectId("6246eaaafb49cf2ed543fd70"),
    ObjectId("6246eaaafb49cf2ed543fd71"),
    ObjectId("6246eaaafb49cf2ed543fd72")
]
let auctions = [
    ObjectId("6247545c643cc19aaa52da90"),
    ObjectId("6247545c643cc19aaa52da91"),
    ObjectId("6247545c643cc19aaa52da92"),
    ObjectId("6247545c643cc19aaa52da93"),
    ObjectId("6247545c643cc19aaa52da94"),
    ObjectId("6247545c643cc19aaa52da95"),
    ObjectId("6247545c643cc19aaa52da96"),
    ObjectId("6247545c643cc19aaa52da97"),
    ObjectId("6247545c643cc19aaa52da98"),
    ObjectId("6247545c643cc19aaa52da99"),
    ObjectId("6247545c643cc19aaa52da9a"),
    ObjectId("6247545c643cc19aaa52da9b"),
    ObjectId("6247545c643cc19aaa52da9c"),
    ObjectId("6247545c643cc19aaa52da9d"),
    ObjectId("6247545c643cc19aaa52da9e"),
    ObjectId("6247545c643cc19aaa52da9f"),
    ObjectId("6247545c643cc19aaa52daa0"),
    ObjectId("6247545c643cc19aaa52daa1"),
    ObjectId("6247545c643cc19aaa52daa2"),
    ObjectId("6247545c643cc19aaa52daa3"),
    ObjectId("6247545c643cc19aaa52daa4"),
    ObjectId("6247545c643cc19aaa52daa5"),
    ObjectId("6247545c643cc19aaa52daa6"),
    ObjectId("6247545c643cc19aaa52daa7"),
    ObjectId("6247545c643cc19aaa52daa8"),
    ObjectId("6247545c643cc19aaa52daa9"),
    ObjectId("6247545c643cc19aaa52daaa"),
    ObjectId("6247545c643cc19aaa52daab"),
    ObjectId("6247545c643cc19aaa52daac"),
    ObjectId("6247545c643cc19aaa52daad"),
    ObjectId("6247545c643cc19aaa52daae"),
    ObjectId("6247545c643cc19aaa52daaf"),
    ObjectId("6247545c643cc19aaa52dab0"),
    ObjectId("6247545c643cc19aaa52dab1"),
    ObjectId("6247545c643cc19aaa52dab2"),
    ObjectId("6247545c643cc19aaa52dab3"),
    ObjectId("6247545c643cc19aaa52dab4"),
    ObjectId("6247545c643cc19aaa52dab5"),
    ObjectId("6247545c643cc19aaa52dab6"),
    ObjectId("6247545c643cc19aaa52dab7"),
    ObjectId("6247545c643cc19aaa52dab8"),
    ObjectId("6247545c643cc19aaa52dab9"),
    ObjectId("6247545c643cc19aaa52daba"),
    ObjectId("6247545c643cc19aaa52dabb"),
    ObjectId("6247545c643cc19aaa52dabc"),
    ObjectId("6247545c643cc19aaa52dabd"),
    ObjectId("6247545c643cc19aaa52dabe"),
    ObjectId("6247545c643cc19aaa52dabf"),
    ObjectId("6247545c643cc19aaa52dac0"),
    ObjectId("6247545c643cc19aaa52dac1"),
    ObjectId("6247545c643cc19aaa52dac2"),
    ObjectId("6247545c643cc19aaa52dac3"),
    ObjectId("6247545c643cc19aaa52dac4"),
    ObjectId("6247545c643cc19aaa52dac5"),
    ObjectId("6247545c643cc19aaa52dac6"),
    ObjectId("6247545c643cc19aaa52dac7"),
    ObjectId("6247545c643cc19aaa52dac8"),
    ObjectId("6247545c643cc19aaa52dac9"),
    ObjectId("6247545c643cc19aaa52daca"),
    ObjectId("6247545c643cc19aaa52dacb"),
    ObjectId("6247545c643cc19aaa52dacc"),
    ObjectId("6247545c643cc19aaa52dacd"),
    ObjectId("6247545c643cc19aaa52dace"),
    ObjectId("6247545c643cc19aaa52dacf"),
    ObjectId("6247545c643cc19aaa52dad0"),
    ObjectId("6247545c643cc19aaa52dad1"),
    ObjectId("6247545c643cc19aaa52dad2"),
    ObjectId("6247545c643cc19aaa52dad3"),
    ObjectId("6247545c643cc19aaa52dad4"),
    ObjectId("6247545c643cc19aaa52dad5"),
    ObjectId("6247545c643cc19aaa52dad6"),
    ObjectId("6247545c643cc19aaa52dad7"),
    ObjectId("6247545c643cc19aaa52dad8"),
    ObjectId("6247545c643cc19aaa52dad9"),
    ObjectId("6247545c643cc19aaa52dada"),
    ObjectId("6247545c643cc19aaa52dadb"),
    ObjectId("6247545c643cc19aaa52dadc"),
    ObjectId("6247545c643cc19aaa52dadd"),
    ObjectId("6247545c643cc19aaa52dade"),
    ObjectId("6247545c643cc19aaa52dadf"),
    ObjectId("6247545c643cc19aaa52dae0"),
    ObjectId("6247545c643cc19aaa52dae1"),
    ObjectId("6247545c643cc19aaa52dae2"),
    ObjectId("6247545c643cc19aaa52dae3"),
    ObjectId("6247545c643cc19aaa52dae4"),
    ObjectId("6247545c643cc19aaa52dae5"),
    ObjectId("6247545c643cc19aaa52dae6"),
    ObjectId("6247545c643cc19aaa52dae7"),
    ObjectId("6247545c643cc19aaa52dae8"),
    ObjectId("6247545c643cc19aaa52dae9"),
    ObjectId("6247545c643cc19aaa52daea"),
    ObjectId("6247545c643cc19aaa52daeb"),
    ObjectId("6247545c643cc19aaa52daec"),
    ObjectId("6247545c643cc19aaa52daed"),
    ObjectId("6247545c643cc19aaa52daee"),
    ObjectId("6247545c643cc19aaa52daef"),
    ObjectId("6247545c643cc19aaa52daf0"),
    ObjectId("6247545c643cc19aaa52daf1"),
    ObjectId("6247545c643cc19aaa52daf2"),
    ObjectId("6247545c643cc19aaa52daf3")]
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
        favo.push(auctions[Math.floor(Math.random() * auctions.length)])
    }
    
    let obj = {
        _id: _id[i],
        username: usersnames[i],
        email: `${usersnames[i]}@gmail.com`,
        password: passwords[i],
        favorites: favo
    }
    objs.push(obj)

}

connect(objs)

