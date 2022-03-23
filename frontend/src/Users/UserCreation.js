const usersnames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]
let passwords = ["dump","support","listen","drain","deprivation","draw","chemistry","convert","wedding","experiment","quarrel","bounce","scream","reform","due","series","lunch","range","ice", "horn"]
let objs = []
for(i = 0; i<usersnames.length; i++){
    let obj = {
        Id: i+1,
        Name: usersnames[i],
        Email: `${usersnames[i]}@gmail.com`,
        Password: passwords[i]
    }
    objs.push(obj)
}

const fs = require('fs')
userJSON = JSON.stringify(objs, null, 4)
fs.writeFileSync("users.json", userJSON, "utf-8")

