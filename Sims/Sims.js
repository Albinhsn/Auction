const {GridFSBucket, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const assert = require('assert')
var fs = require('fs')
let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis risus sapien, nec ornare massa porta eu. Nam accumsan ligula odio, quis dapibus justo pellentesque non. Ut molestie interdum lectus ac efficitur. Fusce bibendum, urna eu rhoncus rutrum, ex velit interdum velit, eu rutrum sapien leo sed dui. "
let imageIds = [
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
let cameras = [
    {
        name: "Sony A7R III A Body",
        tags:
        {
            Brand: "Sony",
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
        images: [
            ObjectId("625d58268cdfe43a88040e59"),
            ObjectId("625d5905a116036a983f6b21")
        ]
    },
    {
        name: "Canon EOS R6",
        tags:
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
            AngledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d598839d4f06f9a7e59d8'),
            ObjectId('625d5a243b6a3878b1da9fc0')
        ]
    },
    {
        name: "Sony ZV E10L",
        tags:
        {
            Brand: "Sony",
            Type: "Systemkamera",
            Lens: "Sony E",
            ImageSensorSize: "APS-C",
            Resolution: "24.2",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            WirelessConnection: ["Wi-Fi", "Bluetooth"],
            AngledScreen: "Fullt roter- & fällbar"
        },
        images: [
            ObjectId('625d5a6ee245c365b07af0a8'),
            ObjectId('625d5b7b54ce7f62ae79b3fc')
        ]
    },
    {
        name: "Canon EOS m50 Mark II",
        tags:
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
        images: [
            ObjectId('625d5b9854ce7f62ae79b3fe'),
            ObjectId('625d5baa54ce7f62ae79b401')
        ]

    },
    {
        name: "Canon EOS R",
        tags: {
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
        images: [
            ObjectId('625d5bb754ce7f62ae79b403'),
            ObjectId('625d5bc454ce7f62ae79b405')
        ]
    },
    {
        name: "Sony A7 III",
        tags: {
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
        images: [
            ObjectId('625d5bd954ce7f62ae79b409'),
            ObjectId('625d5be754ce7f62ae79b40b')
        ]
    },
    {
        name: "Canon EOS 90D",
        tags: {
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
        images: [
            ObjectId('625d5bf754ce7f62ae79b40d'),
            ObjectId('625d5c0454ce7f62ae79b40f')
        ]
    },
    {
        name: "Fujifilm X-T3",
        tags: {
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
        images: [
            ObjectId('625d5c1454ce7f62ae79b411'),
            ObjectId('625d5c2254ce7f62ae79b413')
        ]
    },
    {
        name: "Canon EOS R5",
        tags: {
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
        images: [
            ObjectId('625d5c3354ce7f62ae79b415'),
            ObjectId('625d5c3e54ce7f62ae79b417')
        ]
    },
    {
        name: "Nikon Z6 II",
        tags: {
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
        images: [
            ObjectId('625d5c4b54ce7f62ae79b419'),
            ObjectId('625d5c5654ce7f62ae79b41b')
        ]
    },
    {
        name: "Canon IXUS 185",
        tags: {
            Brand: "Canon",
            Type: "Kompaktkamera",
            ImageSensorSize: "2.3'",
            Resolution: "20",
            WeatherProof: "Nej",
            VideoFormat: "4k 30fps",
            MemoryCards: ["SD", "SDHC", "SDXC"],
            AngledScreen: "Fast skärm"
        },
        images: [
            ObjectId('625d5c6254ce7f62ae79b420'),
            ObjectId('625d5c6f54ce7f62ae79b422')
        ]
    },
    {
        name: "Panasonic Lumix DC-TZ200",
        tags: {
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
        images: [
            ObjectId('625d5c7c54ce7f62ae79b424'),
            ObjectId('625d5c8854ce7f62ae79b426')
        ]
    },
    {
        name: "Nikon Coolpix P950",
        tags: {
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
        images: [
            ObjectId('625d5c9454ce7f62ae79b428'),
            ObjectId('625d5c9f54ce7f62ae79b42c')
        ]
    },
    {
        name: "Panasonic LX100 II",
        tags:
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
        images: [
            ObjectId('625d5cab54ce7f62ae79b42f'),
            ObjectId('625d5cb454ce7f62ae79b431')
        ]
    },
    {
        name: "Nikon Coolpix P1000",
        tags:
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
        images: [
            ObjectId('625d5cbf54ce7f62ae79b433'),
            ObjectId('625d5cca54ce7f62ae79b435')
        ]
    },
    {
        name: "Olympus Tough TG-6",
        tags:
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
        images: [
            ObjectId('625d5cd554ce7f62ae79b437'),
            ObjectId('625d5ce254ce7f62ae79b439')
        ]
    },
    {
        name: "Fujifilm X100V",
        tags:
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
        images: [
            ObjectId('625d5ced54ce7f62ae79b43b'),
            ObjectId('625d5cfd54ce7f62ae79b43d')
        ]
    },
    {
        name: "Canon PowerShot G7 X III",
        tags:
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
        images: [
            ObjectId('625d5d2d54ce7f62ae79b43f'),
            ObjectId('625d5d3854ce7f62ae79b441')
        ]
    },
    {
        name: "Canon PowerShot SX70 HS",
        tags:
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
        images: [
            ObjectId('625d5d4454ce7f62ae79b444'),
            ObjectId('625d5d5154ce7f62ae79b446')
        ]
    },
    {
        name: "Canon PowerShot SX430 IS",
        tags:
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
        images: [
            ObjectId('625d5d5e54ce7f62ae79b448'),
            ObjectId('625d5d6854ce7f62ae79b44a')
        ]
    },
    {
        name: "Sony CyberShot DSC-RX100 III",
        tags:
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
        images: [
            ObjectId('625d5d7354ce7f62ae79b44c'),
            ObjectId('625d5d7d54ce7f62ae79b44e')
        ]
    },
    {
        name: "Fujifilm GFX100s",
        tags:
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
        images: [
            ObjectId('625d5d9054ce7f62ae79b450'),
            ObjectId('625d5d9c54ce7f62ae79b452')
        ]
    }
]


let conditions = ["Perfekt", "Bra", "Utmärkt", "Dåligt", "Hyggligt"]
const auctionType = ["Engelsk", "Holländsk", "Schweizisk"]
const uri = "mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


let dbs = ["Users", "Images", "Authentication", "Auctions", "Bids", "Email", "Postage", "Tags"]
async function doEverything(){
    mongodb.MongoClient.connect(uri, function (error, client) {
    assert.ifError(error);
    
        for(let i = 0; i<dbs.length;i++){
            let database = client.db(dbs[i])
            database.dropDatabase();
            console.log("dropped " + dbs[i])
        }
    function randomDate(start, end, startHour, endHour) {
        var date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
    }
    //Image sims
    const dir = "./kamerabilder"
    const files = fs.readdirSync(dir)


        const db = client.db("Images")
        var bucket = new GridFSBucket(db)
        for (let i = 0; i < files.length; i++) {
            fs.createReadStream(dir + "/" + files[i])
                .pipe(bucket.openUploadStreamWithId(imageIds[i], files[i], {
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
    


    //Auction sims
    let C = []
    let bids = []
    let tags = []
    //50 current 50 sold
    for (let i = 0; i < 100; i++) {
        let camera = {}
        let cameraIdx = Math.floor(Math.random() * cameras.length)
        cam = cameras[cameraIdx]
        camera._id = auctionIds[i]
        camera.Name = cam.name        
        camera.Images = cam.images
        camera.Condition = conditions[Math.floor(Math.random() * conditions.length)]
        camera.AuctionType = auctionType[Math.floor(Math.random() * auctionType.length)]
        camera.Description = description
        camera.MinimumBid = Math.floor(Math.random() * 10000) + 500 - (Math.floor(Math.random() * 10000) + 500) % 10
        camera.Seller = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)])
        
        
        //Sim tags
        const possibleTags = ["Brand", "Type", "Lens", "ImageSensorSize", "Resolution", "WeatherProof", "VideoFormat", "MemoryCards", "WirelessConnection", "AngledScreen"]
        let tag = {
            _id: auctionIds[i],
            
        }
        for(let i = 0; i<possibleTags.length; i++){
            try {
                
                tag[possibleTags[i]] = cameras[cameraIdx]["tags"][possibleTags[i]]
            } catch {                            
            }
        }
        tags.push(tag)

        //Create winner
        if (i % 2 === 0 && bids.length > 0) {

            camera.Winner = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)])
            while (camera.Winner === camera.Seller) {
                camera.Winner = ObjectId(bidderIds[Math.floor(Math.random() * bidderIds.length)])
            }
            camera.State = "Slut"
        } else {
            camera.State = "Pågående"
            camera.Winner = null
        }

        if ((i % 3 !== 0 && camera.AuctionType === "Engelsk") || camera.AuctionType === "Schweizisk") {
            camera.PurchasePrice = 0
        }
        else {
            camera.PurchasePrice = parseInt(camera.MinimumBid * 1.25)
        }
        if (camera.AuctionType === "Holländsk") {
            camera.MinimumBid = 0
        }

        //Bid sims 
        if (camera.State === "Pågående") {
            StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date(), 0, 23)
        }else{
            StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth() - 4, new Date().getDate()), new Date(), 0, 23)
        }
        camera.StartDate = StartDate
        camera.EndDate = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() + 8);
        if (camera.AuctionType == "Engelsk" || camera.AuctionType == "Schweizisk") {

            let rand = Math.floor(Math.random() * 5)
            Amount = camera.MinimumBid + 100;

            for (let i = 0; i < rand; i++) {
                let bidderId = bidderIds[Math.floor(Math.random() * bidderIds.length) - 1]
                while (camera.Seller == bidderId) {
                    bidderIds[Math.floor(Math.random() * bidderIds.length) - 1]
                }
                bids.push({
                    AuctionId: camera._id,
                    UserId: bidderIds[Math.floor(Math.random() * bidderIds.length) - 1],
                    Amount: Amount + i * 100
                })
            }
            
        }
        
        if(camera.State === "Slut"){                        
            camera.Winner = bids[bids.length -1].UserId
        }
        
        
        //Old sims for bids (Sprint 2)
        // if (camera.AuctionType === "Engelsk") {
        //     for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        //         let bidderId = bidderIds[Math.floor(Math.random() * bidderIds.length)]
        //         while (bidderId === camera.Seller || bidderId === camera.Winner) {
        //             bidderId = bidderIds[Math.floor(Math.random() * bidderIds.length)]
        //         }
        //         let o = {
        //             _id: new ObjectId(),
        //             bidderId: bidderId,
        //             bid: camera.MinimumBid + j * 100 + 100,
        //             time: new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), StartDate.getHours() + j + 1)
        //         }
        //         camera.BidHistory.push(o)
        //     }
        // }


        // if (i % 2 === 0) {
        //     if (camera.BidHistory.length > 0) {
        //         camera.BidHistory[camera.BidHistory.length - 1].id = camera.Winner
        //         camera.PurchasePrice = camera.BidHistory[camera.BidHistory.length - 1].bid
        //     }
        // }

        C.push(camera)
    }

    
    let database = client.db("Auctions")
    let auctions = database.collection("Auctions")
    let result = auctions.insertMany(C)
    database = client.db("Bids")
    auctions = database.collection("Bids")
    result = auctions.insertMany(bids)
    database = client.db("Tags")
    collection = database.collection("Tags")
    result = collection.insertMany(tags)


    let postages = []
    let postagePrices = [39, 79, 129]
    for(let i = 0; i<100; i++){
        
        let postage = {
            AuctionId: auctionIds[i],
            Postage:   postagePrices[Math.floor(Math.random() * postagePrices.length)] 
        }
        postages.push(postage)
    }

    postageDatabse = client.db("Postage")
    postageCollection = postageDatabse.collection("Auctions")
    result = postageCollection.insertMany(postages)




    //Auth sims
    const { hash } = require('bcrypt');
    const usersnames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]
    let passwords = ["dump", "support", "listen", "drain", "deprivation", "draw", "chemistry", "convert", "wedding", "experiment", "quarrel", "bounce", "scream", "reform", "due", "series", "lunch", "range", "ice", "horn"]

    const hashPasswords = async () => {
        for (let j = 0; j < passwords.length; j++) {
            passwords[j] = await hash(passwords[j], 10)
        }
    }
    let authObjs = []
    let emailObjs = []
    hashPasswords().then(() => {

        for (i = 0; i < usersnames.length; i++) {
            let favo = []
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
                favo.push(auctionIds[Math.floor(Math.random() * auctionIds.length)])
            }


            let authObj = {
                _id: bidderIds[i],
                // Username: usersnames[i],
                Email: `${usersnames[i]}@gmail.com`,
                Password: passwords[i],
                // Favorites: favo,
                // watchlist: []
            }
            let emailObj = {
                _id: bidderIds[i],
                Email: `${usersnames[i]}@gmail.com`
            }
            emailObjs.push(emailObj)
            authObjs.push(authObj)
        }
        
        const emailDatabase = client.db("Email");
        const emailCollection = emailDatabase.collection("Users")
        const emailResult = emailCollection.insertMany(emailObjs)
        const authDatabase = client.db("Authentication")
        const authCollection = authDatabase.collection("Users")
        const result = authCollection.insertMany(authObjs)
    })

    //User sims

    objs = []
    

    for (i = 0; i < usersnames.length; i++) {
        let favo = []
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            favo.push(auctionIds[Math.floor(Math.random() * auctionIds.length)])
        }


        let obj = {
            _id: bidderIds[i],
            Name: usersnames[i],
            Email: `${usersnames[i]}@gmail.com`,
            //Password: passwords[i],
            Favorites: favo,
            //Watchlist: []
        }

        objs.push(obj)
    }
    database = client.db("Users")
    auctions = database.collection("Users")
    result = auctions.insertMany(objs)


    
}
    
)}
doEverything()
