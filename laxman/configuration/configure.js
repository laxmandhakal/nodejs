const mongodb = require("mongodb") //just establishing connection with database
module.exports = {
    mongoClient: mongodb.MongoClient,
    contxt: "mongodb://localhost:27017",
    db_name: "ram",
    collections: "name",
    mongodb
}