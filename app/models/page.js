var shortId = require('short-mongo-id');
var crypto = require('crypto');

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var PageSchema = new Schema({
	id: ObjectId,
	shorturl: {
		type: String,
		required: false,
		default: ""
	},
	cleartext: {
		type: String,
		required: false
	},
	encryptedtext: {
		type: String,
		required: true
	},
	creator_id: {
		type: String,
		required: false,
		default: ""
	},
	viewed: {
		type: Boolean,
		required: false,
		default: false,
	},
	tags: [{
		text: {
			type: String
		}
	}],
	date_added: {
		type: Date,
		required: true,
		default: Date.now,
		index: true
	},
	expireAt: {
		type: Date,
		validate: [function(v) {
			return true; //return (v - new Date()) <= 60000;
		}, 'Cannot expire more than 60 seconds in the future.'],
		default: function() {
			// 1 year seconds from now
			return new Date(new Date().valueOf() + 365 * 86400 * 1000);
		}
	}
});



PageSchema.index({
	date_added: 1
});

PageSchema.index({
	expireAt: 1
}, {
	expireAfterSeconds: 0
});



//MessageSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

module.exports = mongoose.model('Page', PageSchema);

PageSchema.pre("save", function(next, done) {
	var self = this;
	
	if (this.shorturl === "")
		this.shorturl = crypto.randomBytes(10).toString('hex');
	
	if (this.creator_id === "") {
		this.creator_id = crypto.randomBytes(10).toString('hex');
	}
	
	next();
});

