var User = require('./../models/user');

module.exports = {
    retrieveId: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        User.find({'_id' : req.params.id}).lean().exec().then(function (user) {
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

        user._id   = profile.id;
        user.token = token;
        user.name  = profile.displayName;
        user.quests = [];
        user.amigos = [];
        user.email = profile.email;
        user.sexo = 'Masculino';
        if (request.gender == 'female') {
            user.sexo = 'Feminino';
        }
        user.foto = profile._json.picture;
        user.linkbio = profile.profileUrl;

        user.save(function (err) {
            if (err) res.status(500).send('Ocorreu problema ao gravar a quest');
            res.status(200).send(user);
        });
    }
};