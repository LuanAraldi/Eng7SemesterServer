var Mesa = require('./../models/mesa');

module.exports = {
    retrieve: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Mesa.find({}).lean().exec().then(function (mesas) {
            res.setHeader('Content-Type', 'application/json');
            res.send(mesas);
        });
    },

    new: function (req, res) {
        var mesa = new Mesa();
        var request = req.body;

        mesa.nome = request.nome;
        mesa.descricao = request.descricao;
        mesa.usuarios = request.usuarios;
        mesa.createdAt = new Date();
        mesa.updatedAt = new Date();

        mesa.save(function (err) {
            if (err) res.status(500).send('Ocorreu problema ao gravar a mesa');
            res.status(200).send('Mesa salva com sucesso');
        });

    },

    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Mesa.find({'_id' : req.params.id}).lean().exec().then(function (mesa) {
            res.setHeader('Content-Type', 'application/json');
            res.send(mesa);
        });
    },

    remove: function (req, res) {
        Mesa.remove({'_id' : req.params.id}, function (err) {
            if (err) res.status(500).send('Ocorreu problema ao remover a mesa');
            res.status(200).send('Mesa removida com sucesso');
        });
    },

    edit: function (req, res) {
        var mesa = {};
        var request = req.body;

        mesa.nome = request.nome;
        mesa.descricao = request.descricao;
        mesa.updatedAt = new Date();

        Mesa.findOneAndUpdate({'_id': req.params.id}, {$set:quest}, function(err){
            if (err) res.status(500).send('Ocorreu problema ao editar o local');
            res.status(200).send('Local editado com sucesso');
        });
    },

    addMember: function (req, res) {
        Mesa.findByIdAndUpdate(req.params.id, {$push: {"usuarios": req.body.usuario}},
            {safe: true, upsert: true, new : true},
            function(err, user) {
                if (err) res.status(500).send('Ocorreu problema ao adicionar um membro');
                res.status(200).send('Membro adicionado com sucesso');
            }
        );
    }
};
