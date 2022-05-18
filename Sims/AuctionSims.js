const { MongoClient, GridFSBucket, ObjectId } = require('mongodb')
let states = ["Slut", "Pågående"]
let conditions = ["Perfekt", "Bra", "Utmärkt", "Dåligt", "Hyggligt"]
let bidderIds = [
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
let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis risus sapien, nec ornare massa porta eu. Nam accumsan ligula odio, quis dapibus justo pellentesque non. Ut molestie interdum lectus ac efficitur. Fusce bibendum, urna eu rhoncus rutrum, ex velit interdum velit, eu rutrum sapien leo sed dui. "

let cameras = [
    { 
        name: "Sony A7R III A Body",
        tags: 
            { 
                brand : "Sony", 
                type: "Systemkamera", 
                lens: "Sony E", 
                imageSensorSize: "24x36", 
                resolution: "42.4", 
                weatherProof: "Nej", 
                videoFormat: "4k 30fps",
                memoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
                wirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
                angledScreen: "Fällbar"
            },
        images: [
            ObjectId("625d58268cdfe43a88040e59"),
            ObjectId("625d5905a116036a983f6b21")
        ]
    },
    {
        name: "Canon EOS R6",
        tags: 
        {
            brand: "Canon",
            type: "Systemkamera",
            lens: "Canon RF",
            imageSensorSize: "24x36",
            resolution: "20.1",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images:[
            ObjectId('625d598839d4f06f9a7e59d8'),
            ObjectId('625d5a243b6a3878b1da9fc0')
        ]
    },
    {
        name: "Sony ZV E10L",
        tags: 
        { 
            brand: "Sony",
            type: "Systemkamera",
            lens: "Sony E",
            imageSensorSize: "APS-C",
            resolution: "24.2",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images:[
            ObjectId('625d5a6ee245c365b07af0a8'),
            ObjectId('625d5b7b54ce7f62ae79b3fc')
        ]
    },
    {
        name: "Canon EOS m50 Mark II",
        tags: 
        {
            brand: "Canon",
            type: "Systemkamera",
            lens: "Canon EOS M",
            imageSensorSize: "APS-C",
            resolution: "24.1",
            weatherProof: "Nej",
            videoFormat: "4k 24fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fällbar med selfieläge"
        },
        images: [
            ObjectId('625d5b9854ce7f62ae79b3fe'),
            ObjectId('625d5baa54ce7f62ae79b401')
        ]
        
    },
    {
        name: "Canon EOS R",
        tags: {
            brand: "Canon",
            type: "Systemkamera",
            lens: "Canon RF",
            imageSensorSize: "24x36",
            resolution: "30.3",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5bb754ce7f62ae79b403'),
            ObjectId('625d5bc454ce7f62ae79b405')
        ]
    },
    {
        name: "Sony A7 III",
        tags: {
            brand: "Sony",
            type: "Systemkamera",
            lens: "Sony E",
            imageSensorSize: "24x36",
            resolution: "24.2",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            wirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
            angledScreen: "Fällbar"
        },
        images: [
            ObjectId('625d5bd954ce7f62ae79b409'),
            ObjectId('625d5be754ce7f62ae79b40b')
        ]
    },
    {
        name: "Canon EOS 90D",
        tags: {
            brand: "Canon",
            type: "Systemkamera",
            lens: "Canon EF",
            imageSensorSize: "APS-C",
            resolution: "32.5",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            wirelessConnection: ["Wi-Fi"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5bf754ce7f62ae79b40d'),
            ObjectId('625d5c0454ce7f62ae79b40f')
        ]
    },
    {
        name: "Fujifilm X-T3",
        tags: {
            brand: "Fujifilm",
            type: "Systemkamera",
            lens: "Fuji X",
            imageSensorSize: "24x36",
            resolution: "26",
            weatherProof: "Ja",
            videoFormat: "4k 60fps",
            memoryCards: ["UHS-II"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fällbar"
        },
        images:[
            ObjectId('625d5c1454ce7f62ae79b411'),
            ObjectId('625d5c2254ce7f62ae79b413')
        ]
    },
    {
        name: "Canon EOS R5",
        tags: {
            brand: "Canon",
            type: "Systemkamera",
            lens: "Canon RF",
            imageSensorSize: "24x36",
            resolution: "45",
            weatherProof: "Ja",
            videoFormat: "8k 30fps",
            memoryCards: ["CFexpress type B", "UHS-II"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5c3354ce7f62ae79b415'),
            ObjectId('625d5c3e54ce7f62ae79b417')
        ]
    },
    {
        name: "Nikon Z6 II",
        tags: {
            brand: "Nikon",
            type: "Systemkamera",
            lens: "Nikon Z",
            imageSensorSize: "24x36",
            resolution: "24.5",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["CFexpress type B", "UHS-II", "XQD"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fällbar"
        },
        images: [
            ObjectId('625d5c4b54ce7f62ae79b419'),
            ObjectId('625d5c5654ce7f62ae79b41b')
        ]
    },
    {
        name: "Canon IXUS 185",        
        tags: {
            brand: "Canon",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "20",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            angledScreen: "Fast skärm"
        },
        images:[
            ObjectId('625d5c6254ce7f62ae79b420'),
            ObjectId('625d5c6f54ce7f62ae79b422')
        ]
    },
    {
        name: "Panasonic Lumix DC-TZ200",        
        tags: {
            brand: "Panasonic",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "20.1",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fast skärm"
        },
        images: [
            ObjectId('625d5c7c54ce7f62ae79b424'),
            ObjectId('625d5c8854ce7f62ae79b426')
        ]
    },
    {
        name: "Nikon Coolpix P950",
        tags: {
            brand: "Nikon",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "16",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth", "GPS"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5c9454ce7f62ae79b428'),
            ObjectId('625d5c9f54ce7f62ae79b42c')
        ]   
    },
    {
        name: "Panasonic LX100 II",        
        tags:
        {
            brand: "Panasonic",
            type: "Kompaktkamera",
            imageSensorSize: "High Sens MOS",
            resolution: "17",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
            angledScreen: "Fast skärm"
        },
        images: [
            ObjectId('625d5cab54ce7f62ae79b42f'),
            ObjectId('625d5cb454ce7f62ae79b431')
        ]   
    },
    {
        name: "Nikon Coolpix P1000",
        tags:
        {
            brand: "Nikon",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "16",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5cbf54ce7f62ae79b433'),
            ObjectId('625d5cca54ce7f62ae79b435')
        ]
    },
    {
        name: "Olympus Tough TG-6",
        tags:
        {
            brand: "Olympus",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "12",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi"],
            angledScreen: "Fast skärm"
        },
        images: [
            ObjectId('625d5cd554ce7f62ae79b437'),
            ObjectId('625d5ce254ce7f62ae79b439')
        ]
    },
    {
        name: "Fujifilm X100V",
        tags:
        {
            brand: "Fujifilm",
            type: "Kompaktkamera",
            imageSensorSize: "APS-C",
            resolution: "26.1",
            weatherProof: "Ja",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fällbar"
        },
        images: [
            ObjectId('625d5ced54ce7f62ae79b43b'),
            ObjectId('625d5cfd54ce7f62ae79b43d')   
        ]
    },
    {
        name: "Canon PowerShot G7 X III",    
        tags:
        {
            brand: "Canon",
            type: "Kompaktkamera",
            imageSensorSize: "1'",
            resolution: "20.1",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "Bluetooth"],
            angledScreen: "Fällbar med selfieläge"
        },
        images: [
            ObjectId('625d5d2d54ce7f62ae79b43f'),
            ObjectId('625d5d3854ce7f62ae79b441')
        ]
    },
    {
        name: "Canon PowerShot SX70 HS",
        tags:
        {
            brand: "Canon",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "20.3",
            weatherProof: "Nej",
            videoFormat: "4k 30fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi"],
            angledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5d4454ce7f62ae79b444'),
            ObjectId('625d5d5154ce7f62ae79b446')
        ]
    },
    {
        name: "Canon PowerShot SX430 IS",    
        tags:
        {
            brand: "Canon",
            type: "Kompaktkamera",
            imageSensorSize: "2.3'",
            resolution: "20.5",
            weatherProof: "Nej",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "NFC"],
            angledScreen: "Fast skärm"
        },
        images: [
            ObjectId('625d5d5e54ce7f62ae79b448'),
            ObjectId('625d5d6854ce7f62ae79b44a')
        ]
    },
    {
        name: "Sony CyberShot DSC-RX100 III",        
        tags:
        {
            brand: "Sony",
            type: "Kompaktkamera",
            imageSensorSize: "1'",
            resolution: "20.1",
            weatherProof: "Nej",
            videoFormat: "FHD 60fps",
            memoryCards: ["SD", "SDHC", "SDXC"],
            wirelessConnection: ["Wi-Fi", "NFC"],
            angledScreen: "Fällbar med selfieläge"
        },
        images: [
            ObjectId('625d5d7354ce7f62ae79b44c'),
            ObjectId('625d5d7d54ce7f62ae79b44e')
        ]
    },
    {
        name: "Fujifilm GFX100s",
        tags:
            {
                brand: "Fujifilm",
                type: "Mellanformatskamera",
                lens: "Fuji GF",
                imageSensorSize: "43.8x32.9",
                resolution: "102",
                weatherProof: "Ja",
                videoFormat: "4k 30fps",
                memoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
                wirelessConnection: ["Wi-Fi", "Bluetooth"],
                angledScreen: "Fällbar"
            },
        images: [
            ObjectId('625d5d9054ce7f62ae79b450'),
            ObjectId('625d5d9c54ce7f62ae79b452')
        ]   
    }
]
let auctionIds = [
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

//https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

//Auctionstype
const auctionType = ["Engelsk", "Holländsk", "Schweizisk"]


const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function connect(docs){
    try {
        await client.connect();
        const database = client.db("Bids")
        const auctions = database.collection("Bids")
        const result = await auctions.insertMany(docs)

        console.log("inserted docs\n")
        console.log(result)
    } finally{
        await client.close();
    }
}




let C = []
//50 current 50 sold
for(let i  = 0; i<100; i++){
    let camera = {}
    cam = cameras[Math.floor(Math.random() * cameras.length)]
    camera._id = auctionIds[i]
    camera.name = cam.name
    camera.tags = cam.tags
    camera.images = cam.images
    camera.condition = conditions[Math.floor(Math.random() * conditions.length)]
    camera.auctionType = auctionType[Math.floor(Math.random() * auctionType.length)]
    camera.description = description
    camera.minimumBid = Math.floor(Math.random() * 10000) + 500 - (Math.floor(Math.random() * 10000) + 500) % 10
    camera.seller = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)])
    camera.bidHistory = []
    

    
    
    //Create winner
    if(i%2 === 0){
        
        camera.winner = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)]) 
        while(camera.winner === camera.seller){
            camera.winner = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)])
        }
        camera.state = "Slut"
    }else{
        camera.state = "Pågående"
        camera.winner = -1
    }
    
    if((i%3 !== 0 && camera.auctionType === "Engelsk") || camera.auctionType === "Schweizisk"){
        camera.purchasePrice = 0 
    }
    else{
        camera.purchasePrice = parseInt(camera.minimumBid * 1.25)
    }
    if(camera.auctionType === "Holländsk"){
        camera.minimumBid = 0
    }


    if (camera.state === "Pågående") {
        StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date(), 0, 23)
    }
    else {
        StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth() - 4, new Date().getDate()), new Date(), 0, 23)
    }
    camera.startDate = StartDate
    camera.endDate = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() + 8);
    

    if(camera.auctionType === "Engelsk"){
        for(let j = 0; j < Math.floor(Math.random() * 6); j++) {
            let bidderId = bidderIds[Math.floor(Math.random() * bidderIds.length)]
            while(bidderId === camera.seller || bidderId === camera.winner){
                bidderId = bidderIds[Math.floor(Math.random() * bidderIds.length)]
            }
            let o = {
                _id: new ObjectId(),
                bidderId: bidderId,
                bid: camera.minimumBid + j * 100 + 100,
                time: new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), StartDate.getHours() + j + 1)
            }
            camera.bidHistory.push(o)
        }
    }
    

    if(i%2 ===0 ){
        if(camera.bidHistory.length > 0){
            camera.bidHistory[camera.bidHistory.length - 1].id = camera.winner
            camera.purchasePrice = camera.bidHistory[camera.bidHistory.length - 1].bid
        }
    }
    
    C.push(camera)
}

connect(C).catch(console.dir)