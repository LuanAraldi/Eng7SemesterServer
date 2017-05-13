var mongoose = require('mongoose');
require('./user');

var localSchema = mongoose.Schema({
    nome          : String,
    coordenada    : {
        latitude  : String,
        longitude : String
    },
    mestre        : { type: String, ref: 'User' },
    createdAt     : { type: Date, default: Date.now },
    updatedAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Local', localSchema);