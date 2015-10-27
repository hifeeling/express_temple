#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('express')();
var mongoose = require('mongoose');
var passport = require('passport');

/**
 * Create http server
 */
var server = require('http').createServer(app);
var port = process.env.PORT || '3000';


/**
 * Connect db
 */
var connect = function () {
    mongoose.connect('mongodb://localhost/fd');
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


/**
 * Bootstrap passport config
 */
require('./config/passport')(passport);


/**
 * Bootstrap application settings
 */
require('./config/express')(app, passport);


/**
 * Bootstrap routes
 */
require('./config/routes')(app, passport);


server.listen(port);
console.log('Express app started on port ' + port);


/**
 * Expose
 */
module.exports = app;

