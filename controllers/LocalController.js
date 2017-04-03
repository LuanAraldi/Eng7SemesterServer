var Local = require('./../models/local');

module.exports = {
    retrieve: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Local.find({}).lean().exec().then(function (locais) {
            res.send(locais);
        });
    },

    new: function (req, res) {
        var local = new Local();
        var request = req.body;

        local.nome = request.nome;
        local.coordenada.latitude = request.coordenada.latitude;
        local.coordenada.longitude = request.coordenada.longitude;
        local.mestre = request.mestre;
        local.createdAt = new Date();
        local.updatedAt = new Date();

        local.save(function (err) {
            if (err) res.status(500).send('Ocorreu problema ao gravar o local');
            res.status(200).send('Local salvo com sucesso');
        });

    },

    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Local.find({'_id' : req.params.id}).lean().exec().then(function (locais) {
            res.send(locais);
        });
    },

    remove: function (req, res) {
        Local.remove({'_id' : req.params.id}, function (err) {
            if (err) res.status(500).send('Ocorreu problema ao remover o local');
            res.status(200).send('Local removido com sucesso');
        });
    },

    edit: function (req, res) {
        var local = {};
        var request = req.body;

        local.nome = request.nome;
        local.coordenada.latitude = request.coordenada.latitude;
        local.coordenada.longitude = request.coordenada.longitude;
        local.mestre = request.mestre;
        local.updatedAt = new Date();

        Local.findOneAndUpdate({'_id': req.params.id}, {$set:quest}, function(err){
            if (err) res.status(500).send('Ocorreu problema ao editar o local');
            res.status(200).send('Local editado com sucesso');
        });
    }
}