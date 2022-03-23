
let objs = []
//Ids
const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

//Sellers & Winners
const sellers = ["Albin", "Jesper", "Adrian", "Aiden", "Russel",  "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]

const cameras = ["Sony A55", "Pentax X5", "Canon Eos 400D", "Nikon D60", "Canon PowerShot g7 Mark III", "Nikon D5", "Nikon Coolpix L22", "Nikon D3100", "Canon Eos 550D", "Pentax K7", "Sony A7RIV", "Nikon D800", "Sony A68"]

let imgs = {
    "Sony A55": [
        "https://www.kamerabild.se/sites/kamerabild.se/files/styles/article_image/public/imported/558602.jpg?itok=hkJPg6cT",        
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Sony_SLT-A55_02s5.jpg/300px-Sony_SLT-A55_02s5.jpg"
    ],
    "Pentax X5": [
        "https://pricespy-75b8.kxcdn.com/product/standard/280/1412601.jpg",
        "https://www.imaging-resource.com/PRODS/pentax-x5/ZYFRONT-MD.JPG?41",
        "https://www.imaging-resource.com/PRODS/pentax-x5/ZYBACK-MD.JPG?41",
        "https://www.imaging-resource.com/PRODS/pentax-x5/ZYLEFT-MD.JPG?41"
    ],
    "Canon Eos 400D": [
        "https://pricespy-75b8.kxcdn.com/product/standard/280/132341.jpg"
    ],
    "Nikon D60": [
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Nikon_D60_body_front.jpg",
        "https://pricespy-75b8.kxcdn.com/product/standard/280/271662.jpg"
    ],
    "Canon PowerShot g7 Mark III": [
        "https://www.fotokungen.com/pub_images/large/G7XMIIIsvart.jpg"

    ],
    "Nikon D5": [
        "https://cdn.pocket-lint.com/r/s/970x/assets/images/136437-cameras-review-nikon-d5-review-image1-tjar8gh7sk.jpg"

    ],
    "Nikon Coolpix L22": [
        "https://www.cnet.com/a/img/resize/7f7091ca83190b3f19d3dc044fb6fe728f4a8c3b/hub/2011/02/01/99a6c8c5-8bb7-11e3-a24e-d4ae52e62bcc/33984466_OVR.png?auto=webp&fit=crop&height=675&width=1200",
        "https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9aeqFMY3fvEkMLBGAiSy_A2cHTS06eskuPufRYp4E2az_GNSUXRk1l1MHGp9Mr7pSQXa7yWyx9cG/Views/26198_L22_34r_lo.png"
    ],
    "Nikon D3100": [
        "https://www.idg.se/editorial/0/path/1.351689!imageManager/2828603199.png",
        "https://www.kenrockwell.com/nikon/d3100/D3S_8285-0600.jpg"

    ],
    "Canon Eos 550D": [
        "https://www.canon.se/media/EOS_550D_Angle2_tcm87-932852.jpg",
        "https://www.canon.se/media/EOS_550D_Angle3_tcm87-932854.jpg",
        "https://www.canon.se/media/EOS_550D_Default_tcm87-932858.jpg"
    ],  
    "Pentax K7": [
        "https://www.cyberphoto.se/storage/77D5CF565E59C3FFF3469F0E97002BB52653F7F746A779D4C08686EF2E46F71D/0c2f363bfdac45af822c52a1f7102254/jpg/media/a75f5758cd5441d1ad48dc3dece23865/K-71855-product_2.jpg",
        "https://m.media-amazon.com/images/I/91MovaJMWKL._AC_SL1500_.jpg"
    ],
    "Sony A7RIV": [
        "https://1.img-dpreview.com/files/p/E~TS590x0~articles/9306199729/a7RIV-beauty-03.jpeg"

    ],
    "Nikon 800D": [
        "https://www.europe-nikon.com/tmp/EU/2419865273/3760176746/2327365364/27184057/1391280926/2780083465/1053240650/3915156789/2964121563/3036989078/1975208020.png",
        "https://www.backscatter.com/ITEM_IMAGES/nkl-25480_1.jpg?resizeid=6&resizeh=600&resizew=600"
    ],  
    "Sony A68": [
        "https://www.kamerabild.se/sites/kamerabild.se/files/styles/teaser_500/public/field/image/sonya68_0.jpg?itok=rnOVyhVa",
        "https://www.sony.se/image/e45d80fd87f4b0b5b772363a94f39c1b?fmt=pjpeg&wid=1200&hei=470&bgcolor=F1F5F9&bgc=F1F5F9"
    ],
}



//Conditions
const conditions = ["Utmärkt", "Bra", "Dåligt", "Hygglig", "Perfekt"]



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
    if (S == "Slut"){
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
        W = undefined
    }

    //Randomize bidhistory
    for(j = 1; j<Math.floor(Math.random() * 6); j++){
        let o = {
            Id: Math.floor(Math.random() * 30) + 1,
            Bid: price  + j * 10,
            Time: new Date(D.getFullYear(), D.getMonth(), D.getDate() - (7 + i))
        }
        B.push(o)
    }
    

    let obj = {
        Id: i,
        Bidhistory: B,
        State: S,
        Title: Title,
        Condition: conditions[Math.floor(Math.random() * conditions.length)],
        StopTime: D,
        StartTime: new Date(D.getFullYear(), D.getMonth(), D.getDate()-7),
        PurchaseNow: price * 2.5,
        MinimalBid: price,
        Winner: W,
        Seller: Sell,
        Images: imgs[Title]
    }
    objs.push(obj)
}

const fs = require('fs')
// let auctionjson = fs.readFileSync("auctions.json", "utf-8")
// let X = JSON.parse(auctionjson)
// X.push(objs)
auctionjson = JSON.stringify(objs, null, 4)
fs.writeFileSync("auctions.json", auctionjson,"utf-8")