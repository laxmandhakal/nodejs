const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/laxman', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, done) {
    if (err) {
        console.log('error connecting to database', err);
    } else {
        console.log('db connection success');
    }
});