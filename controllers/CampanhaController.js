var Campanha = require('./../models/campanha');

module.exports = {
    retrieve: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Campanha.find({}).lean().exec().then(function (campanhas) {
            res.send(campanhas);
        });
    },

    new: function (req, res) {
        var campanha = new Campanha();
        var request = req.body;

        campanha.mestre = request.mestre;
        campanha.nome = request.nome;
        campanha.descricao = request.nome;
        campanha.usuarios = request.usuarios;
        campanha.quests = request.quests;
        campanha.createdAt = new Date();
        campanha.updatedAt = new Date();

        campanha.save(function (err) {
            if (err) res.status(500).send('Ocorreu problema ao gravar a campanha');
            res.status(200).send('Campanha salvo com sucesso');
        });

    },

    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Campanha.find({'_id' : req.params.id})
            .populate(['quests','usuarios'])
            .lean()
            .exec()
            .then(function (campanha) {
            res.send(campanha);
        });
    },

    remove: function (req, res) {
        Campanha.remove({'_id' : req.params.id}, function (err) {
            if (err) res.status(500).send('Ocorreu problema ao remover a campanha');
            res.status(200).send('Campanha removido com sucesso');
        });
    },

    edit: function (req, res) {
        var campanha = {};
        var request = req.body;

        campanha.mestre = request.mestre;
        campanha.nome = request.nome;
        campanha.descricao = request.descricao;

        campanha.updatedAt = new Date();

        Campanha.findOneAndUpdate({'_id': req.params.id}, {$set:quest}, function(err){
            if (err) res.status(500).send('Ocorreu problema ao editar o local');
            res.status(200).send('Local editado com sucesso');
        });
    }
}
