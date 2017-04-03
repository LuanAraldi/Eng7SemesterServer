var mongoose = require('mongoose');

var mesaSchema = mongoose.Schema({
    nome : String,
    descricao : String,
    usuarios : [String],
    createdAt : Date,
    updatedAt : Date
});

module.exports = mongoose.model('Mesa', mesaSchema);
