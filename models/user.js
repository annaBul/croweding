var mongoose = require("mongoose");
var crypto = require('crypto');

var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,        
        default: 'User',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        default: 'http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg',
    },
    language: {
        type: String,
        enum: ['en', 'ru'],
        default: 'ru',
    },
    theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'light',
    },
    lastLoginData: { 
         type: Date,
         default: Date.now,
    },
    rating:{
        type: Number,
        default: 0,
    },
    resume:{
        type: String,        
    },
    subscriptions: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Project',        
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment',
    }],
    projects: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Project',
    }],
    support: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Supporter',
    }],
});

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var UserModel = mongoose.model('users', User);
/*var bob = new UserModel({ username: "h", email: "g", password: "j" });
//console.log(bob);
bob.save(function (err) {
  if (err) return handleError(err);
});*/
/*var user = {
    username: "q",
    email: "1",
    password: "q"
};
// if(!req.body.img){
//     return res.send({ error: 'Incorrected data' });
//  }
UserModel.create(user, function(err, item) {
    console.log('r');
    
});*/
module.exports.UserModel = UserModel;
module.exports.UserSchema = User;