const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
console.log("BD conected!");
module.exports = mongoose;
