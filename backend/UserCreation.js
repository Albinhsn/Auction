const usersNames = ["Albin", "Jesper", "Adrian", "Aiden", "Russel", "Charlie", "Shaun", "Jenna", "Hugh", "Alvin", "Leroy", "George", "Lex", "Lee", "Alicia", "Isabelle", "Ellie", "Joe", "Samuel", "Gustav"]

let objs = []
for(i = 0; i<usersNames.length; i++){
    let obj = {
        Id: i+1,
        Name: usersNames[i],
        Email: `${usersNames[i]}@gmail.com`,

    }
    objs.push(obj)
}

const fs = require('fs')
userJSON = JSON.stringify(objs, null, 4)
fs.writeFileSync("users.json", userJSON, "utf-8")

