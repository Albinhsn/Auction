const ObjectId = require('mongodb').ObjectId
let _id = new ObjectId()
timestamp = _id.getTimestamp().getTime()
console.log(timestamp)
console.log(new Date(timestamp).toISOString())


console.log(_id === new_id)
