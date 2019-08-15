const mongoose  = require('mongoose');

// FLOWERS Schema SETUP
var flowersSchema = new mongoose.Schema({
    date: String,
    name: String
});

module.exports = mongoose.model("Flowers", flowersSchema);