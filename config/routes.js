var UserController     = require('./../controllers/UserController');
var QuestController    = require('./../controllers/QuestController');
var LocalController    = require('./../controllers/LocalController');
var CampanhaController = require('./../controllers/CampanhaController');
var MesaController     = require('./../controllers/MesaController');
var reactCookie = require('react-cookie');
module.exports = function(app, passport) {

    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'public_profile', 'user_friends'] }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            failureRedirect : '/'
    }), function (req, res) {
        reactCookie.plugToRequest(req, res);
        res.cookie('usuario', req.user, {domain: "sigmaprojectclient.herokuapp.com"})
        res.json(req.user);
        //res.redirect("https://sigmaprojectclient.herokuapp.com/#/Dashboard")
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/api/user/:id', function (req, res) {
       UserController.retrieveId(req, res);
    });

    app.post('/api/user/:id/addquest', function (req, res) {
        UserController.addQuest(req, res);
    });

    // Quests
    app.get('/api/quests', function(req, res) {
        QuestController.retrieve(req, res);
    });

    app.get('/api/quests/:id', function (req, res) {
        QuestController.retrieveId(req, res);
    });

    app.post('/api/quests/new', function(req, res) {
        QuestController.new(req, res);
    });

    app.delete('/api/quests/:id', function(req, res) {
        QuestController.remove(req, res);
    });

    app.patch('/api/quests/:id', function(req, res) {
       QuestController.edit(req, res);
    });

    // Locais
    app.get('/api/locais', function(req, res) {
        LocalController.retrieve(req, res);
    });

    app.get('/api/locais/:id', function (req, res) {
        LocalController.retrieveId(req, res);
    });

    app.post('/api/locais/new', function(req, res) {
        LocalController.new(req, res);
    });

    app.delete('/api/locais/:id', function(req, res) {
        LocalController.remove(req, res);
    });

    app.patch('/api/locais/:id', function(req, res) {
        LocalController.edit(req, res);
    });

    // Campanhas
    app.get('/api/campanhas', function(req, res) {
        CampanhaController.retrieve(req, res);
    });

    app.get('/api/campanhas/:id', function (req, res) {
        CampanhaController.retrieveId(req, res);
    });

    app.post('/api/campanhas/new', function(req, res) {
        CampanhaController.new(req, res);
    });

    app.delete('/api/campanhas/:id', function(req, res) {
        CampanhaController.remove(req, res);
    });

    app.patch('/api/campanhas/:id', function(req, res) {
        CampanhaController.edit(req, res);
    });

    // Mesas
    app.get('/api/mesas', function(req, res) {
        MesaController.retrieve(req, res);
    });

    app.get('/api/mesas/:id', function (req, res) {
        MesaController.retrieveId(req, res);
    });

    app.post('/api/mesas/new', function(req, res) {
        MesaController.new(req, res);
    });

    app.delete('/api/mesas/:id', function(req, res) {
        MesaController.remove(req, res);
    });

    app.patch('/api/mesas/:id', function(req, res) {
        MesaController.edit(req, res);
    });

    app.post('/api/mesas/:id/addmember', function(req, res) {
        MesaController.addMember(req, res);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
