var mongoose = require('mongoose');

var localSchema = mongoose.Schema({
    nome          : String,
    coordenada    : {
        latitude  : String,
        longitude : String
    },
    mestre        : String,
    createdAt     : { type: Date, default: Date.now },
    updatedAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Local', localSchema);