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

//########BACKUP & RESTORE#############
// two fomart of backup and restore
// bson format (machine readable)
// json & csv (human redable)

// 1 bson structure
// backup command
// mongodump ==> this command will backup entire database into default dump folder
// mongodump --db <db_name> this will backup givedn database into default dump folder
// mongodump --db <db_name> --out <path to destination folder>

// restore command
// mongoerstore this will look for default dump folder and restore all the database that exist in dump folder
// mongorestore <path_to_destination_folder> this will look after destination folder
//  mongoexport mongoimport
// mongodump mongorestore
// json & csv format
// json structure
// export command
// mongoexport --db <db_name> --collection <collection_name> --out destinaton with json extension
// mongoexport -d <db_name> -c <collection_name> -o destinaton with json extension

// csv
// export command
mongoexport --db group17db --collection users --type=csv --fileds 'comma,separated vlaue to be exported' --out <destination directory path with csv extension>


//########BACKUP & RESTORE#############
