let states = ["Slut", "Pågående"]
let conditions = ["Perfekt", "Bra", "Utmärkt", "Dåligt", "Hyggligt"]

let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis risus sapien, nec ornare massa porta eu. Nam accumsan ligula odio, quis dapibus justo pellentesque non. Ut molestie interdum lectus ac efficitur. Fusce bibendum, urna eu rhoncus rutrum, ex velit interdum velit, eu rutrum sapien leo sed dui. "
//Figure out how to write to mongodb
let cameras = [
    { 
        Name: "Sony A7R III A Body",
        Tags: 
            { 
                Brand : "Sony", 
                Type: "Systemkamera", 
                Lens: "Sony E", 
                ImageSensorSize: "24x36", 
                Resolution: "42.4", 
                WeatherProof: "Nej", 
                VideoFormat: "4k 30fps",
                MemoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
                WirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
                AngledScreen: "Fällbar"
            },
        Images: [
            "https://www.cyberphoto.se/storage/8FB97B44030D5B7EDB86B9F98E0F36BC1219B65974CFD129717E50F9027FB446/dc398a8943e14f35b043c3d55890304a/jpg/media/7fc7d2daeafd4cdba579e9d3f8afa031/a7rmk3a_1.jpg",
            "https://obj.fotosidan.se/obj/docpart/bb/bb795d75ef3d885f55803c61dd990e56.jpg"
        ]
    },
    {
        Name: "Canon EOS R6",
        Tags: 
        {
            Brand: "Canon",
            Type: "Systemkamera",
            Lens: "Canon RF",
            ImageSensorSize: "24x36",
            Resolution: "20.1",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter-& fällbar"
        },
        Images:[
            "https://www.rajalaproshop.se/media/catalog/product/cache/f1ec723725bd5bfc9f8ed8a7baf802be/c/a/canon-eos-r6.jpg",
            "https://2.img-dpreview.com/files/p/E~TC4x3S590x0~articles/1548544834/body/Canon-EOS-R6-lead-01.jpeg"
        ]
    },
    {
        Name: "Sony ZV E10L",
        Tags: 
        { 
            Brand: "Sony",
            Type: "Systemkamera",
            Lens: "Sony E",
            ImageSensorSize: "APS-C",
            Resolution: "24.2",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter-& fällbar"
        },
        Images:[
            "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650.jpg",
            "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650_right.jpg"
        ]
    },
    {
        Name: "Canon EOS m50 Mark II",
        Tags: 
        {
            Brand: "Canon",
            Type: "Systemkamera",
            Lens: "Canon EOS M",
            ImageSensorSize: "APS-C",
            Resolution: "24.1",
            WeatherProof: "Nej",
            VideoFormat: "4k 24fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fällbar med selfieläge"
        },
        Images: [
            "https://www.cyberphoto.se/storage/8FA18A3F6B94244E855A5784D944F8C3FA6B1F64EC20D576521F5826BDF77977/180439043e24497c851b5848e75bdb33/jpg/media/663a8e9043f1444b9245011a952bc422/eosm50mk2_body_black.jpg",
            "https://obj.fotosidan.se/obj/docpart/5b/5b6f7e9ccb6a4876c5d19c5eeb16f13f.jpg"
        ]
        
    },
    {
        Name: "Canon EOS R",
        Tags: {
            Brand: "Canon",
            Type: "Systemkamera",
            Lens: "Canon RF",
            ImageSensorSize: "24x36",
            Resolution: "30.3",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://www.scandinavianphoto.se/globalassets/1050927.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2018/12/Canon_EOS_R_24_105mm_46605-scaled.jpg"
        ]
    },
    {
        Name: "Sony A7 III",
        Tags: {
            Brand: "Sony",
            Type: "Systemkamera",
            Lens: "Sony E",
            ImageSensorSize: "24x36",
            Resolution: "24.2",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            WirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
            AngledScreen: "Fällbar"
        },
        Images: [
            "https://www.gofoto.se/pub_images/large/0168008069-sony-a7-iii-svart-28-703-5-5-6-c.jpg",
            "https://www.fotokungen.com/pub_images/original/A7III2870.jpg"
        ]
    },
    {
        Name: "Canon EOS 90D",
        Tags: {
            Brand: "Canon",
            Type: "Systemkamera",
            Lens: "Canon EF",
            ImageSensorSize: "APS-C",
            Resolution: "32.5",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
            WirelessConnection: ["Wi-Fi"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/149041-cameras-review-review-canon-eos-90d-review-image1-y948ezej2c.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2019/12/Canon_EOS_90D_65337-1261x946.jpg"
        ]
    },
    {
        Name: "Fujifilm X-T3",
        Tags: {
            Brand: "Fujifilm",
            Type: "Systemkamera",
            Lens: "Fuji X",
            ImageSensorSize: "24x36",
            Resolution: "26",
            WeatherProof: "Ja",
            VideoFormat: "4k 60fps",
            MemoryCards: ["UHS-II"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fällbar"
        },
        Images:[
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/145646-cameras-review-review-fujifilm-x-t3-review-image1-bktd4euk5c.jpg",
            "https://www.cyberphoto.se/storage/9DB08CAE09BF5B05B8A80691B5EE1CB0408BA1106A42034104A39911B2A41193/a4ee0b458dda493680ddb13c8e7f76a5/jpg/media/c7cfbb14bcff4c65b0398b7704ce2bd0/x-t3svart-product_1.jpg"
        ]
    },
    {
        Name: "Canon EOS R5",
        Tags: {
            Brand: "Canon",
            Type: "Systemkamera",
            Lens: "Canon RF",
            ImageSensorSize: "24x36",
            Resolution: "45",
            WeatherProof: "Ja",
            VideoFormat: "8k 30fps",
            MemoryCards: ["CFexpress Type B", "UHS-II"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/158670-cameras-review-canon-eos-r5-review-image3-ftrvqcyoeb.jpg",
            "https://www.rajalaproshop.se/media/catalog/product/cache/f1ec723725bd5bfc9f8ed8a7baf802be/a/d/ad2ae541dc432b1526181ac7e671c2daf805c251_Canon_EOS_R5_C.jpg"
        ]
    },
    {
        Name: "Nikon Z6 II",
        Tags: {
            Brand: "Nikon",
            Type: "Systemkamera",
            Lens: "Nikon Z",
            ImageSensorSize: "24x36",
            Resolution: "24.5",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["CFexpress Type B", "UHS-II", "XQD"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fällbar"
        },
        Images: [
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/155043-cameras-review-nikon-z6-ii-review-image1-ldwjiktq5v.jpg",
            "https://www.dpreview.com/files/p/articles/5602333549/Nikon_Z6_II_Z7_II_hands-on-018.jpeg"
        ]
    },
    {
        Name: "Canon IXUS 185",        
        Tags: {
            Brand: "Canon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "20",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            AngledScreen: "Fast skärm"
        },
        Images:[
            "https://www.pricerunner.se/product/1200x630/1893297363/Canon-IXUS-185.jpg",
            "https://www.cyberphoto.se/storage/8A62AA3AA8E4E716AA1D7EC8C25319F94B76A27E714C574C13333EEED99D74AC/754b96c443804e19ab1cd3af5f0c6bef/jpg/media/ef399b032eba40cb90af8d75e25d8115/ixus185black-product_4.jpg"
        ]
    },
    {
        Name: "Panasonic Lumix DC-TZ200",        
        Tags: {
            Brand: "Panasonic",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "20.1",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fast skärm"
        },
        Images: [
            "https://www.scandinavianphoto.se/globalassets/1029070.jpg",
            "https://www.fotokungen.com/pub_images/large/TZ200svartback.jpg"
        ]
    },
    {
        Name: "Nikon Coolpix P950",
        Tags: {
            Brand: "Nikon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "16",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth", "GPS"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://www.cyberphoto.se/storage/F499F36B2D0319225B7C3F86530C1B3F5E294C8878F5672D7A0E095E7FE0A77C/0a11109d3304422ab1bce4a4078e72b0/jpg/media/5358ba005c504e5bb906f11ecd5b7815/cpp950_frontside.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2020/02/Nikon-Coolpix-P950-bak-scaled-1.jpg"
        ]   
    },
    {
        Name: "Panasonic LX100 II",        
        Tags:
        {
            Brand: "Panasonic",
            Type: "Kompaktkamera",
            ImageSensorSize: "High Sens MOS",
            Resolution: "17",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth", "NFC"],
            AngledScreen: "Fast skärm"
        },
        Images: [
            "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3838154327/beauty/Panasonic_LX100_Beauty-05.jpeg",
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/145441-cameras-review-review-panasonic-lumix-lx100-mark-2-main-image2-footccx7zl.jpg"
        ]   
    },
    {
        Name: "Nikon Coolpix P1000",
        Tags:
        {
            Brand: "Nikon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "16",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://www.lifewire.com/thmb/OoDVn9OvqzQVRGIuz6OoOosGsz4=/1500x1500/filters:no_upscale()/03LW493676-HeroSquare-9fba311f70044a4a9794392ef8e441b9.jpg",
            "https://4.img-dpreview.com/files/p/E~TS590x0~articles/0991735089/Product-shots/NikonP1000-beauty02.jpeg"
        ]
    },
    {
        Name: "Olympus Tough TG-6",
        Tags:
        {
            Brand: "Olympus",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "12",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi"],
            AngledScreen: "Fast skärm"
        },
        Images: [
            "https://www.scandinavianphoto.se/globalassets/tough_tg-6_red__product_010.jpg",
            "https://www.gofoto.se/pub_images/large/0168007056-olympus-tough-tg-6-rod-c.jpg"
        ]
    },
    {
        Name: "Fujifilm X100V",
        Tags:
        {
            Brand: "Fujifilm",
            Type: "Kompaktkamera",
            ImageSensorSize: "APS-C",
            Resolution: "26.1",
            WeatherProof: "Ja",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fällbar"
        },
        Images: [
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/151739-cameras-review-fujifilm-x100v-review-image1-m6ezeivnuw.jpg",
            "https://www.gofoto.se/pub_images/original/0168007448-x100v-silver-f.jpg"
        ]
    },
    {
        Name: "Canon PowerShot G7 X III",    
        Tags:
        {
            Brand: "Canon",
            Type: "Kompaktkamera",
            ImageSensorSize: "1'",
            Resolution: "20.1",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fällbar med selfieläge"
        },
        Images: [
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/148530-cameras-review-hands-on-canon-powershot-g7-x-iii-image1-3o1l7m8dxy.jpg",
            "https://www.scandinavianphoto.se/globalassets/1044981.jpg"
        ]
    },
    {
        Name: "Canon PowerShot SX70 HS",
        Tags:
        {
            Brand: "Canon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "20.3",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        Images: [
            "https://www.proshop.se/Images/915x900/2681592_3ef7db964064.jpg",
            "https://www.cyberphoto.se/storage/F93987D2D31CA64E08598BDF0DABF511933662186D0BDC927A413D0BFCB0C251/e1a6db5c45ca4edc9fb01ee153a4eacb/jpg/media/5e75ceebfda54db6ab85e7522e44dd62/pssx70_525_2.jpg"
        ]
    },
    {
        Name: "Canon PowerShot SX430 IS",    
        Tags:
        {
            Brand: "Canon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "20.5",
            WeatherProof: "Nej",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "NFC"],
            AngledScreen: "Fast skärm"
        },
        Images: [
            "https://shop.mediapoolen.se/Images/products/0611214.jpg",
            "https://www.scandinavianphoto.se/globalassets/1031523.jpg"
        ]
    },
    {
        Name: "Sony CyberShot DSC-RX100 III",        
        Tags:
        {
            Brand: "Sony",
            Type: "Kompaktkamera",
            ImageSensorSize: "1'",
            Resolution: "20.1",
            WeatherProof: "Nej",
            VideoFormat: "FHD 60fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "NFC"],
            AngledScreen: "Fällbar med selfieläge"
        },
        Images: [
            "https://www.scandinavianphoto.se/globalassets/1012376.jpg",
            "https://i.pcmag.com/imagery/reviews/05xiv7xw8z8KDyDr42qQvIf-24.fit_scale.size_760x427.v1569476773.jpg"
        ]
    },
    {
        Name: "Fujifilm GFX100s",
        Tags:
            {
                Brand: "Fujifilm",
                Type: "Mellanformatskamera",
                Lens: "Fuji GF",
                ImageSensorSize: "43.8x32.9",
                Resolution: "102",
                WeatherProof: "Ja",
                VideoFormat: "4k 30fps",
                MemoryCards: ["SD", "SDHC", "SDXC", "UHS-II"],
                WirelessConnection: ["Wi-Fi", "Bluetooth"],
                AngledScreen: "Fällbar"
            },
        Images: [
            "https://1.img-dpreview.com/files/p/E~TS940x788~articles/8398600454/Fujifilm-GFX-100S-lead-01.jpeg",
            "https://www.scandinavianphoto.se/globalassets/1050570.jpg?ref=D5107085A0&w=960&h=960&mode=max"
        ]   
    }
]

//https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

//Auctionstype
const auctionType = ["Engelsk", "Holländsk", "Schweizisk"]

var MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function connect(docs){
    try {
        await client.connect();
        const database = client.db("Auctionista")
        const auctions = database.collection("auctions")
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
    let camera = {Id: i}
    cam = cameras[Math.floor(Math.random() * cameras.length)]
    camera.Name = cam.Name
    camera.Tags = cam.Tags
    
    camera.AuctionType = auctionType[Math.floor(Math.random() * auctionType.length)]
    camera.Description = description
    camera.MinimumBid = Math.floor(Math.random() * 10000) + 500 - (Math.floor(Math.random() * 10000) + 500) % 10
    camera.Seller = Math.floor(Math.random() * 20)
    
    camera.BidHistory = []
    

    
    
    //Create winner
    if(i%2 === 0){
        
        camera.Winner = Math.floor(Math.random() * 20)
        while(camera.Winner === camera.Seller){
            camera.Winner = Math.floor(Math.random() * 20)
        }
        camera.State = "Slut"
    }else{
        camera.State = "Pågående"
    }
    
    if (camera.State === "Pågående") {
        StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date(), 0, 23)
    }
    else {
        StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth() - 4, new Date().getDate()), new Date(), 0, 23)
    }
    camera.StartDate = StartDate
    camera.EndDate = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() + 8);
    


    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        let o = {
            Id: Math.floor(Math.random() * 20),
            BidderId: Math.floor(Math.random() * 20),
            Bid: camera.MinimumBid + j * 100 + 100,
            Time: new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), StartDate.getHours() + j + 1)
        }
        camera.BidHistory.push(o)
    }

    if(i%2 ===0 ){
        if(camera.BidHistory.length > 0){
            camera.BidHistory[camera.BidHistory.length - 1].Id = camera.Winner
        }
    }
    
    C.push(camera)
}

connect(C).catch(console.dir)