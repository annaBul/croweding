var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');

router.get('/user/:id', function(req, res, next) {
    if(!req.params.id){
        return res.send({ error: 'Incorrected data' });
    }
   // if (req.isAuthenticated()) {
        UserModel.findById({'_id': mongoose.Types.ObjectId(req.params.id)} , function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                console.log('user');
                if(user)
                {                
                    var userInfo = {
                        username: user.username,
                        id: user.id,
                        imageUrl: user.imageUrl,
                        rating: user.rating,
                        resume: user.resume,
                        projects: user.projects,
                        comments: user.comments,
                        support: user.support
                    }
                    
                    return res.send({
                        success: true,
                        user: userInfo});

                } else {
                    return res.send({error: "User don't found!"});
                }          
            }
        });
    //}
    
});


/*

var userInfo = {
                        username: user.username,
                        id: user.id,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        resume:user.resume
}

 */

router.get('/user/:id/settings', function(req, res, next) {
    if(!req.params.id && !req.params.user){
        return res.send({ error: 'Incorrected data' });
    }
   // if (req.isAuthenticated()) {
        UserModel.findById({'_id': mongoose.Types.ObjectId(req.params.id)} , function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                console.log('user');
                if(user)
                {                
                   user.username = req.params.user.username;
                   user.email= eq.params.user.email;
                   user.imageUrl = req.params.user.imageUrl;
                   user.password = req.params.user.password;

                   //need settings
                   
                    return res.send({
                        success: true});

                } else {
                    return res.send({error: "User don't found!"});
                }          
            }
        });
    //}
    
});


module.exports = router;
