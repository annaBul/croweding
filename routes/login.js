var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;

router.post('/login', function(req, res, next) {
    if(!req.body.password || !req.body.email){
        return res.send({ error: 'Incorrected data' });
    }
    UserModel.findOne( {'email': req.body.email} , function (err, user) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(user)
            { 
                if(user.checkPassword(req.body.password)){
                    return res.send(user);
                }
                return res.send({error: 'Incorrected password'});

            } else {
                return res.send({error: 'User doesn`t exists'});
            }          
        }
    });
});

module.exports = router;
