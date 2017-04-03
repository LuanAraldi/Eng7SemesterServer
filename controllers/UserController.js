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
    }
};