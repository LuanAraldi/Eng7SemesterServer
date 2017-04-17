var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;

var User = require('./../models/user');

var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new facebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'link', 'email', 'gender', 'picture']
    },

    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({'_id' : profile.id}, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var usuario = new User();
                    usuario._id   = profile.id;
                    usuario.token = token;
                    usuario.name  = profile.displayName;
                    usuario.quests = [];
                    usuario.email = profile.email;
                    usuario.sexo = 'Masculino';
                    if (profile.gender == 'female') {
                        usuario.sexo = 'Feminino';
                    }
                    usuario.foto = profile._json.picture;
                    usuario.linkbio = profile.profileUrl;

                    usuario.save(function (err) {
                        if (err) throw err;
                        return done(null, usuario);
                    });


                }

            });
        });

    }));
};
