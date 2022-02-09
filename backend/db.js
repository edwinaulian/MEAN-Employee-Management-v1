const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CrudDB', (err) => {
    if (!err) {
        console.log("MongooDB Connection succeeseded...");
    } else {
        console.log("Error connect to db : " + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;