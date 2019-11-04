const mongodb = require('mongodb')
module.exports = {
    mongoClient: mongodb.MongoClient,
    db_name: 'group17db',
    collection_name: 'users',
    conxnURL: 'mongodb://localhost:27017'
}