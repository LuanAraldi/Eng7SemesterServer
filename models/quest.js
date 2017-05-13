var mongoose = require('mongoose');
require('./user');

var questSchema = mongoose.Schema({
    criador      : {type : String, ref: 'User'},
    local        : {
        latitude  : String,
        longitude : String
    },
    nome         : String,
    subtitulo    : String,
    descricao    : String,
    visibilidade : String,
    objetivos    : [{
        local : {
            latitude  : String,
            longitude : String
        },
        estagio : Number,
        titulo : String,
        descricao : String
    }],
    createdAt    : { type: Date, default: Date.now },
    updatedAt    : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quest', questSchema);
