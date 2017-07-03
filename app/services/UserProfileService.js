var request = require('request');

var User = require('../models/user');
var Page = require('../models/page');


exports.getPublicKeysForUser = function(req, res) {
	var user_id = req.body.user_id;
	var criteria = {
		user_id: user_id
	};

	User.find(criteria, function(err, public_keys) {
		if (!public_keys || err) {
			res.json({
				status: 0,
				message: 'No public keys found',
				public_keys: []
			});
		}
		else {
			var key_count = public_keys.length;
			res.json({
				status: 1,
				message: 'User public keys',
				key_count: key_count,
				public_keys: public_keys
			});
		}
	});
}



exports.addPublicKey = function(req, res) {
	var user_id = req.body.user_id;
	var criteria = {
		user_id: user_id
	};



}


