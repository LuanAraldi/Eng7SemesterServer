var mongoose = require('mongoose');

var questSchema = mongoose.Schema({
    criador      : String,
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
