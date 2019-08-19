const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

// FLOWERS Schema SETUP
const flowersSchema = new Schema({
    date: String,
    name: String
});

const Flowers = mongoose.model('Flowers', flowersSchema);
module.exports = Flowers;