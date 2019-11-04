const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/group17db', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, done) {
    if (err) {
        console.log('error connecting to database');
    } else {
        console.log('db connection success');
    }
});