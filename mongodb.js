// command to access mongo shell
// mongo  this will provide interface to work with mongo shell command
// if mongo doesnot work use mongod (mongod will intiate mongo db driver)

// if you see > arrow head interface you are good to go with shell 
// shell commands
// show dbs //  list all the database
// use <db_name> if db exist select existing db else create new db
// db shows selected database
// show collections // list all the collections of selected db
// INSERT
// db.<Col_name>.insert({valid_JSON})
// eg db.users.insert({name:'kisor'})

// READ
// db.<col_name>.find({})// object inside find is query builder
// eg db.users.find({})

// UPDATE
// db.<col_name>.update({},{},{})
// first object is query builder
// 2nd object is payload
// 3rd object is options
// eg. db.users.update({address:'tinkune'},{$set:{data_to_be_updated}},{multi:true});

// REMOVE
// db.<col_name>.remove({query builder}) // if nothing passed it will remove entire documents

// drop collection
// db.<col_name>.drop()

// drop Database
// db.dropDatabase()
