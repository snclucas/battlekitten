var crypto = require('crypto');

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    firstLogin: { type: Boolean, default: true },
    token: String,
    public_keys: [
    	{ key: String,
    	  tag: String }
    ],
    local            : {
        email        : String,
        password     : String,
        displayName  : String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        tokenSecret  : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};



userSchema.pre("save",function(next, done) {
  var self = this;
  this.token = crypto.randomBytes(16).toString('hex');

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
