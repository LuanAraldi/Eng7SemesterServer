var User = require('./../models/user');

module.exports = {
    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        User.find({'_id' : req.params.id})
            .populate(['quests', 'amigos'])
            .lean()
            .exec()
            .then(function (user) {
            res.send(user);
        });
    },

    addQuest: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {$push: {"quests": req.body.quest}},
            {safe: true, upsert: true, new : true},
            function(err, user) {
                if (err) res.status(500).send('Ocorreu problema ao aceitar a quest');
                res.status(200).send('Quest aceita com sucesso');
            }
        );
    },

    addFriend: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {$push: {"amigos": req.body.friend}},
            {safe: true, upsert: true, new : true},
            function(err, user) {
                if (err) res.status(500).send('Ocorreu problema ao adicionar o amigo');
                res.status(200).send('Amigo adicionado com sucesso');
            }
        );
    },

    new: function (req, res) {
        var user = new User();
        var request = req.body;
        User.findOne({'_id' : request._id}, function(err, user) {
            if (err) {
                return err;
            }
            if (user) {
                return user;
            }
            user._id   = request._id;
            user.token = request.token;
            user.name  = request.name;
            user.quests = [];
            user.amigos = [];
            user.email = request.email;
            user.sexo = 'Masculino';
            if (request.sexo  == 'female') {
                user.sexo = 'Feminino';
            }
            user.foto = request.foto;
            user.linkbio = request.linkbio;

            user.save(function (err) {
                if (err) res.status(500).send('Ocorreu problema ao gravar o usuario');
                res.status(200).send(user);
            });
        });
    }
};