
let objs = []
//Ids
const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

//Sellers & Winners
const sellers = ["Albin", "Jesper", "Adrian", "Aiden", "Russel",  "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]

const cameras = ["Sony A55", "Pentax X5", "Canon Eos 400D", "Nikon D60", "Canon PowerShot g7 Mark III", "Nikon D5", "Nikon Coolpix L22", "Nikon D3100", "Canon Eos 550D", "Pentax K7", "Sony A7RIV", "Nikon D800", "Sony A68"]
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
        Title: cameras[Math.floor(Math.random() * cameras.length)],
        Condition: conditions[Math.floor(Math.random() * conditions.length)],
        StopTime: D,
        StartTime: new Date(D.getFullYear(), D.getMonth(), D.getDate()-7),
        PurchaseNow: price * 2.5,
        MinimalBid: price,
        Winner: W,
        Seller: Sell,
        
    }
    objs.push(obj)
}

const fs = require('fs')
// let auctionjson = fs.readFileSync("auctions.json", "utf-8")
// let X = JSON.parse(auctionjson)
// X.push(objs)
auctionjson = JSON.stringify(objs, null, 4)
fs.writeFileSync("auctions.json", auctionjson,"utf-8")