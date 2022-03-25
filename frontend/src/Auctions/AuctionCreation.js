
let objs = []
//Ids
const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

//Sellers & Winners
const sellers = ["Albin", "Jesper", "Adrian", "Aiden", "Russel",  "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]

const cameras = ["Sony A55", "Pentax X5", "Canon Eos 400D", "Nikon D60", "Canon PowerShot g7 Mark III", "Nikon D5", "Nikon Coolpix L22", "Nikon D3100", "Canon Eos 550D", "Pentax K7", "Sony A7RIV", "Nikon 800D", "Sony A68"]

let imgs = {
    "Sony A55": [      
        {
            original : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Sony_SLT-A55_02s5.jpg/300px-Sony_SLT-A55_02s5.jpg",
            thumbnail: ""
        }
    ],
    "Pentax X5": [
        {
            original : "https://m.media-amazon.com/images/I/71U4yh8ahML._AC_SX466_.jpg",
            thumbnail: ""
        }
    ],
    "Canon Eos 400D": [
        {
            original : "https://smartson.se/dA/7e73774ab4/front620-9.jpg",
            thumbnail: ""
        }
        
    ],
    "Nikon D60": [
        {
            original : "https://upload.wikimedia.org/wikipedia/commons/8/8d/Nikon_D60_body_front.jpg",
            thumbnail: ""
        }
    ],
    "Canon PowerShot g7 Mark III": [
        {
            original : "https://www.fotokungen.com/pub_images/large/G7XMIIIsvart.jpg",
            thumbnail: ""
        }

    ],
    "Nikon D5": [
        
        {
            original : "https://cdn.pocket-lint.com/r/s/970x/assets/images/136437-cameras-review-nikon-d5-review-image1-tjar8gh7sk.jpg",
            thumbnail: ""
        }
    ],
    "Nikon Coolpix L22": [
        {
            original : "https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9aeqFMY3fvEkMLBGAiSy_A2cHTS06eskuPufRYp4E2az_GNSUXRk1l1MHGp9Mr7pSQXa7yWyx9cG/Views/26198_L22_34r_lo.png",
            thumbnail: ""
        }
    ],
    "Nikon D3100": [
        {
            original : "https://www.idg.se/editorial/0/path/1.351689!imageManager/2828603199.png",
            thumbnail: ""
        },
        {
            original : "https://www.kenrockwell.com/nikon/d3100/D3S_8285-0600.jpg",
            thumbnail: ""
        }
        

    ],
    "Canon Eos 550D": [
        {
            original : "https://www.canon.se/media/EOS_550D_Angle2_tcm87-932852.jpg",
            thumbnail: ""
        },
        {
            original : "https://www.canon.se/media/EOS_550D_Angle3_tcm87-932854.jpg",
            thumbnail: ""
        },
        {
            original : "https://www.canon.se/media/EOS_550D_Default_tcm87-932858.jpg",
            thumbnail: ""
        },
        
        
        
    ],  
    "Pentax K7": [
        
        
        {
            original : "https://www.cyberphoto.se/storage/77D5CF565E59C3FFF3469F0E97002BB52653F7F746A779D4C08686EF2E46F71D/0c2f363bfdac45af822c52a1f7102254/jpg/media/a75f5758cd5441d1ad48dc3dece23865/K-71855-product_2.jpg",
            thumbnail: ""
        },
        {
            original : "https://m.media-amazon.com/images/I/91MovaJMWKL._AC_SL1500_.jpg",
            thumbnail: ""
        },
    ],
    "Sony A7RIV": [
        
        {
            original : "https://1.img-dpreview.com/files/p/E~TS590x0~articles/9306199729/a7RIV-beauty-03.jpeg",
            thumbnail: ""
        },
    ],
    "Nikon 800D": [
        
        {
            original : "https://www.europe-nikon.com/tmp/EU/2419865273/3760176746/2327365364/27184057/1391280926/2780083465/1053240650/3915156789/2964121563/3036989078/1975208020.png",
            thumbnail: ""
        },
    ],  
    "Sony A68": [
        
        {
            original : "https://www.cnet.com/a/img/hub/2015/11/05/553fd936-b056-4e60-b789-9efd284284a3/sony-a68-mfr-43.jpg",
            thumbnail: ""
        },
    ],
}

//Auctionstype
const auctionType = ["Engelsk", "Holländsk", "Schweizisk"]

//Conditions
const conditions = ["Utmärkt", "Bra", "Dåligt", "Hygglig", "Perfekt"]

const tags = ["Systemkamera", "Kompaktkamera", "Mellanformatskamera"]

//https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}


for(i = 1; i<31; i++){
    //Generate price
    let price = Math.random() * 1000
    price = price - price % 10
    
    let Title = cameras[Math.floor(Math.random() * cameras.length)]
    
    //Generate state
    let S = "Pågående"
    if (i % 4 == 0){
        S = "Slut"
    }

    //Generate start and stoptime depending on state 
    date = new Date()
    if (S == "Pågående"){
        D = randomDate(new Date(), new Date(date.setMonth(date.getMonth()+1)), 0, 23)
    }
    else{
        D = randomDate(new Date(date.setMonth(date.getMonth()-4)), new Date(), 0, 23)
    }
    let B = [

    ]

    //Make sure winner and seller != 
    if (S != "Pågående"){
        W = Math.floor(Math.random() * 31)
        Sell = Math.floor(Math.random() * 31)
        if (W === Sell) {
            Sell = W + 1
            if (Sell>30){
                Sell = 1
            }
        }
    }else{
        Sell = Math.floor(Math.random() * 31)
        W = ""
    }

    //Randomize bidhistory
    for(j = 1; j<Math.floor(Math.random() * 6); j++){
        let o = {
            Id: Math.floor(Math.random() * 20),
            Bid: price  + j * 10,
            Time: new Date(D.getFullYear(), D.getMonth(), D.getDate() - (7 + i))
        }
        B.push(o)
    }
    
    //Get random auctionType


    let obj = {
        Id: i,
        BidHistory: B,
        State: S,
        Title: Title,
        Condition: conditions[Math.floor(Math.random() * conditions.length)],
        StopTime: D,
        StartTime: new Date(D.getFullYear(), D.getMonth(), D.getDate()-7),
        PurchaseNow: price * 2.5,
        MinimalBid: price,
        Winner: W,
        Seller: Sell,
        Images: imgs[Title],
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis risus sapien, nec ornare massa porta eu. Nam accumsan ligula odio, quis dapibus justo pellentesque non. Ut molestie interdum lectus ac efficitur. Fusce bibendum, urna eu rhoncus rutrum, ex velit interdum velit, eu rutrum sapien leo sed dui. ",
        AuctionType: auctionType[Math.floor(Math.random() * auctionType.length) ],
        Tags: tags[Math.floor(Math.random() * tags.length) - 1]
    }
    objs.push(obj)
}

const fs = require('fs')
// let auctionjson = fs.readFileSync("auctions.json", "utf-8")
// let X = JSON.parse(auctionjson)
// X.push(objs)
auctionjson = JSON.stringify(objs, null, 4)
fs.writeFileSync("auctions.json", auctionjson,"utf-8")