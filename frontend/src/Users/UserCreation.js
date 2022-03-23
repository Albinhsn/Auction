const usersnames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]
let passwords = ["dump","support","listen","drain","deprivation","draw","chemistry","convert","wedding","experiment","quarrel","bounce","scream","reform","due","series","lunch","range","ice", "horn"]
let objs = []
let favo = []



for(i = 0; i<usersnames.length; i++){
    let favo = []
    for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
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

const fs = require('fs')
userJSON = JSON.stringify(objs, null, 4)
fs.writeFileSync("users.json", userJSON, "utf-8")

