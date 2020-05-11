const mongoose = require("mongoose");
const uuidv1 = require('uuid/v1'); 
const crypto = require('crypto'); // it is used for hashing

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : true
    },
    email: {
        type : String,
        trim : true,
        required : true
    },
    hashed_password: {
        type : String,
        trim : true,
        required : true
    },
    salt: String, // salt will be long randomly generated string
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    // resetPasswordLink: {
    //     data: String,
    //     default: ""
    // },
});

// virtual field
userSchema
    .virtual("password")  // instead of saving it in db we save it in virtual field
    .set(function(password) { // This argument password is the actual password that we get from the user
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1(); // uuidv1 gives us the unique timestamp
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password
    });

//methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1',this.salt) // sha1 is an encrypted standard
                        .update(password)
                        .digest('hex');
        }
        catch (err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema);














