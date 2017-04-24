var Quest = require('./../models/quest');
var Local = require('./../models/local');

module.exports = {
    retrieve: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        Quest.find({}).lean().exec().then(function (quests) {
            res.send(quests);
        });
    },

    new: function (req, res) {
        var quest = new Quest();
        var request = req.body;

        quest.criador = request.criador;
        quest.local = request.local;
        quest.nome = request.nome;
        quest.subtitulo = request.subtitulo;
        quest.descricao = request.descricao;
        quest.visibilidade = request.visibilidade;
        quest.objetivos = request.objetivos;
        quest.createdAt = new Date();
        quest.updatedAt = new Date();

        quest.save(function (err) {
            if (err) res.status(500).send('Ocorreu problema ao gravar a quest');
            res.status(200).send('Quest salva com sucesso');
        });

    },

    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var questComLocal = {};
        Quest.find({'_id' : req.params.id}).lean().exec().then(function (quest) {
            questComLocal = quest;
            Local.find({'_id' : quest.local}).lean().exec().then(function (local) {
                questComLocal.local = local;
                res.send(questComLocal);
            })
        });
    },

    remove: function (req, res) {
        Quest.remove({'_id' : req.params.id}, function (err) {
            if (err) res.status(500).send('Ocorreu problema ao remover a quest');
            res.status(200).send('Quest removida com sucesso');
        });
    },

    edit: function (req, res) {
        var quest = {};
        var request = req.body;

        quest.local = request.local;
        quest.nome = request.nome;
        quest.subtitulo = request.subtitulo;
        quest.descricao = request.descricao;
        quest.visibilidade = request.visibilidade;
        quest.updatedAt = new Date();

        Quest.findOneAndUpdate({'_id': req.params.id}, {$set:quest}, function(err){
            if (err) res.status(500).send('Ocorreu problema ao editar a quest');
            res.status(200).send('Quest editada com sucesso');
        });
    }
}