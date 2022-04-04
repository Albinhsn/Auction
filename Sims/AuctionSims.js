const { ObjectId } = require('mongodb');

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
            "https://www.cyberphoto.se/storage/8FB97B44030D5B7EDB86B9F98E0F36BC1219B65974CFD129717E50F9027FB446/dc398a8943e14f35b043c3d55890304a/jpg/media/7fc7d2daeafd4cdba579e9d3f8afa031/a7rmk3a_1.jpg",
            "https://obj.fotosidan.se/obj/docpart/bb/bb795d75ef3d885f55803c61dd990e56.jpg"
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
            angledScreen: "Fullt roter-& fällbar"
        },
        images:[
            "https://www.rajalaproshop.se/media/catalog/product/cache/f1ec723725bd5bfc9f8ed8a7baf802be/c/a/canon-eos-r6.jpg",
            "https://2.img-dpreview.com/files/p/E~TC4x3S590x0~articles/1548544834/body/Canon-EOS-R6-lead-01.jpeg"
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
            angledScreen: "Fullt roter-& fällbar"
        },
        images:[
            "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650.jpg",
            "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650_right.jpg"
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
            "https://www.cyberphoto.se/storage/8FA18A3F6B94244E855A5784D944F8C3FA6B1F64EC20D576521F5826BDF77977/180439043e24497c851b5848e75bdb33/jpg/media/663a8e9043f1444b9245011a952bc422/eosm50mk2_body_black.jpg",
            "https://obj.fotosidan.se/obj/docpart/5b/5b6f7e9ccb6a4876c5d19c5eeb16f13f.jpg"
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
            "https://www.scandinavianphoto.se/globalassets/1050927.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2018/12/Canon_EOS_R_24_105mm_46605-scaled.jpg"
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
            "https://www.gofoto.se/pub_images/large/0168008069-sony-a7-iii-svart-28-703-5-5-6-c.jpg",
            "https://www.fotokungen.com/pub_images/original/A7III2870.jpg"
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
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/149041-cameras-review-review-canon-eos-90d-review-image1-y948ezej2c.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2019/12/Canon_EOS_90D_65337-1261x946.jpg"
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
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/145646-cameras-review-review-fujifilm-x-t3-review-image1-bktd4euk5c.jpg",
            "https://www.cyberphoto.se/storage/9DB08CAE09BF5B05B8A80691B5EE1CB0408BA1106A42034104A39911B2A41193/a4ee0b458dda493680ddb13c8e7f76a5/jpg/media/c7cfbb14bcff4c65b0398b7704ce2bd0/x-t3svart-product_1.jpg"
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
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/158670-cameras-review-canon-eos-r5-review-image3-ftrvqcyoeb.jpg",
            "https://www.rajalaproshop.se/media/catalog/product/cache/f1ec723725bd5bfc9f8ed8a7baf802be/a/d/ad2ae541dc432b1526181ac7e671c2daf805c251_Canon_EOS_R5_C.jpg"
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
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/155043-cameras-review-nikon-z6-ii-review-image1-ldwjiktq5v.jpg",
            "https://www.dpreview.com/files/p/articles/5602333549/Nikon_Z6_II_Z7_II_hands-on-018.jpeg"
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
            "https://www.pricerunner.se/product/1200x630/1893297363/Canon-IXUS-185.jpg",
            "https://www.cyberphoto.se/storage/8A62AA3AA8E4E716AA1D7EC8C25319F94B76A27E714C574C13333EEED99D74AC/754b96c443804e19ab1cd3af5f0c6bef/jpg/media/ef399b032eba40cb90af8d75e25d8115/ixus185black-product_4.jpg"
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
            "https://www.scandinavianphoto.se/globalassets/1029070.jpg",
            "https://www.fotokungen.com/pub_images/large/TZ200svartback.jpg"
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
            "https://www.cyberphoto.se/storage/F499F36B2D0319225B7C3F86530C1B3F5E294C8878F5672D7A0E095E7FE0A77C/0a11109d3304422ab1bce4a4078e72b0/jpg/media/5358ba005c504e5bb906f11ecd5b7815/cpp950_frontside.jpg",
            "https://www.ljudochbild.se/wp-content/uploads/2020/02/Nikon-Coolpix-P950-bak-scaled-1.jpg"
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
            "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3838154327/beauty/Panasonic_LX100_Beauty-05.jpeg",
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/145441-cameras-review-review-panasonic-lumix-lx100-mark-2-main-image2-footccx7zl.jpg"
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
            "https://www.lifewire.com/thmb/OoDVn9OvqzQVRGIuz6OoOosGsz4=/1500x1500/filters:no_upscale()/03LW493676-HeroSquare-9fba311f70044a4a9794392ef8e441b9.jpg",
            "https://4.img-dpreview.com/files/p/E~TS590x0~articles/0991735089/Product-shots/NikonP1000-beauty02.jpeg"
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
            "https://www.scandinavianphoto.se/globalassets/tough_tg-6_red__product_010.jpg",
            "https://www.gofoto.se/pub_images/large/0168007056-olympus-tough-tg-6-rod-c.jpg"
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
            "https://cdn.pocket-lint.com/r/s/970x/assets/images/151739-cameras-review-fujifilm-x100v-review-image1-m6ezeivnuw.jpg",
            "https://www.gofoto.se/pub_images/original/0168007448-x100v-silver-f.jpg"
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
            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/148530-cameras-review-hands-on-canon-powershot-g7-x-iii-image1-3o1l7m8dxy.jpg",
            "https://www.scandinavianphoto.se/globalassets/1044981.jpg"
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
            "https://www.proshop.se/images/915x900/2681592_3ef7db964064.jpg",
            "https://www.cyberphoto.se/storage/F93987D2D31CA64E08598BDF0DABF511933662186D0BDC927A413D0BFCB0C251/e1a6db5c45ca4edc9fb01ee153a4eacb/jpg/media/5e75ceebfda54db6ab85e7522e44dd62/pssx70_525_2.jpg"
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
            "https://shop.mediapoolen.se/images/products/0611214.jpg",
            "https://www.scandinavianphoto.se/globalassets/1031523.jpg"
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
            "https://www.scandinavianphoto.se/globalassets/1012376.jpg",
            "https://i.pcmag.com/imagery/reviews/05xiv7xw8z8KDyDr42qQvIf-24.fit_scale.size_760x427.v1569476773.jpg"
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
            "https://1.img-dpreview.com/files/p/E~TS940x788~articles/8398600454/Fujifilm-GFX-100S-lead-01.jpeg",
            "https://www.scandinavianphoto.se/globalassets/1050570.jpg?ref=D5107085A0&w=960&h=960&mode=max"
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
    


    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
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

    if(i%2 ===0 ){
        if(camera.bidHistory.length > 0){
            camera.bidHistory[camera.bidHistory.length - 1].id = camera.winner
        }
    }
    
    C.push(camera)
}

connect(C).catch(console.dir)