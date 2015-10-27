/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

/**
 * Expose
 */

module.exports = function (passport) {
	// serialize sessions
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// use these strategies
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({ username: username }, function(err, user) {
	  			if (err) { return done(err); }
	  			if (!user) { return done(null, false); }
	  			if (!user.authenticate(password)) { console.info(password); return done(null, false); }
	  			return done(null, user);
			});
		}
	));
};