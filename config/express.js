var express = require('express');
var session = require('express-session');
var compression = require('compression');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var flash = require('connect-flash'); // 也是利用session机制做跨页面的信息传递


/**
 * Expose
 */

module.exports = function (app, passport){
    
    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));


    // Static files middleware
    app.use(express.static(path.join(__dirname, '../public')));


    // set views path, template engine
    app.engine('html', require('ejs').renderFile);
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'html');


    app.use(logger('dev')); // 开启开发环境日志
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: 'keyboard cat' }));
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }));


    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());


    // connect flash for flash messages - should be declared after sessions
    app.use(flash());
}


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });