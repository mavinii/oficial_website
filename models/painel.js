const mongoose  = require('mongoose');

// SUNDAY Schema SETUP
var sundaySchema = new mongoose.Schema({
    date: String,
    name: String,
    tel: String,
    email: String
});

module.exports = mongoose.model("Sunday", sundaySchema);
// Sunday.create(  USAR ESSE COD PARA TESTAR OUTRAS ROTAS
//     {
//         date: "20th apr", 
//         name: "Aline and Marcos", 
//         tel: "000-00000", 
//         email:"seila@seila.ie"
//     }, function(err, sunday){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("NEw Sunday Created: ");
//             console.log(sunday);
//         }
//     });