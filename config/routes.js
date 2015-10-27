var users = require('users');
var auth = require('./middlewares/authorization');

module.exports = function (app, passport){
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/logout', users.logout);
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: '无效的账户或密码',
    }), users.session);

    app.get('/info', auth.requiresLogin, users.editInfo);
    app.get('/list', auth.requiresLogin, users.list);
    app.get('/getUser', auth.requiresLogin, users.getUser);
    app.post('/addUser', users.addUser);
    app.get('/removeUser/:id', users.removeUser);
    app.post('/editUser', users.editUser);
}