const express = require('express');
const morgan = require('morgan');
const app = express(); // now this app constant hold entire express framework
var path = require('path');
app.set('port', 9090)
var port = app.get('port');
const mongodb = require("mongodb") //just establishing connection with database
const mongoClient = mongodb.MongoClient
const contxt = "mongodb://localhost:27017"
module.exports = { express, morgan, app, mongodb, mongoClient, contxt }