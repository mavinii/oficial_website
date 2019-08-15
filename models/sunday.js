const mongoose  = require('mongoose');

// SUNDAY Schema SETUP
var sundaySchema = new mongoose.Schema({
    date: String,
    name: String,
    tel: String,
    email: String
});

module.exports = mongoose.model("Sunday", sundaySchema);