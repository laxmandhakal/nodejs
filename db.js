const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/here', function(err, done) {
    if (err) {
        console.log('error connecting to database');
    } else {
        console.log('db connection success');
    }
});