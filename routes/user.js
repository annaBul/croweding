var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var ProjectModel =  require('../models').ProjectModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');
   

router.get('/user/:id', function(req, res, next) {
    if(!req.params.id){
        return res.send({ error: 'Incorrected data' });
    }{
        UserModel.findById({'_id': mongoose.Types.ObjectId(req.params.id)} , function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
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
    }
});


router.get('/user/:id/settings',function(req, res, next) {    
     passport.authenticate('jwt', function (err, user) {
         if(err){
            return res.send({error: "Some error!"});
         }
      if (user) {
        var userSettings ={    
            username: user.username,
            id: user.id,
            email: user.email,
            imageUrl: user.imageUrl,
            password: user.password,
        }
        return res.send({
            success: true,
            user: userSettings});
      } else {
        return res.send({error: "No access"});
      }
    } )(req, res, next)  
  });


router.post('/user/:id/settings',function(req, res, next) {    
     passport.authenticate('jwt', function (err, user) {         
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(user)
            {   
                user.username = req.body.username;
                user.email= req.body.email;
                user.imageUrl = req.body.imageUrl;
                if(req.body.password){
                    user.password = req.body.password;
                }
               //need settings
                user.save();
                return res.send({
                    success: true});

            } else {
                return res.send({error: "User don't found!"});
            }          
        }
    } )(req, res, next)  
  });



  router.get('/user/:id/projects', function(req, res, next) {
    if(!req.params.id){
        return res.send({ error: 'Incorrected data' });
    }{
        UserModel.findById({'_id': mongoose.Types.ObjectId(req.params.id)} , function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                if(user)
                {                
                    ProjectModel.find({'author': user.id} , function (err, projects) {
                        if (err) {
                            res.statusCode = 500;
                            console.log('Internal error(%d): %s',res.statusCode,err.message);
                            return res.send({ error: 'Server error' });
                        } else {
                            if(projects.length !== 0)
                            {     
                                var projectsInfo = [];

                                projects.forEach(function(project) {
                                    projectsInfo.push({
                                        title: project.title,
                                        id: project.id,
                                        imageUrl: project.imageUrl,
                                        completionDate: project.completionDate,
                                        budget: project.budget,
                                        totalBudget: project.totalBudget,
                                        createdDate: formatDate(project.createdDate),
                                        author: { 
                                            username: user.username,
                                            id: user.id
                                        }                                      
                                    });
                                }, this);

                                return res.send({
                                    success: true,
                                    projects: projectsInfo});
                            }
                    
                            return res.send({
                            success: true,
                            projects: []});
                        }
                    });

                } else {
                    return res.send({error: "User don't found!"});
                }          
            }
        });
    }
});


function formatDate(date) {    
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;    
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;    
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;    
    return dd + '-' + mm + '-' + yy;
  }
















module.exports = router;
/*
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
                if(user)
                {      
                    var userSettings ={    
                        username: user.username,
                        id: user.id,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        password: user.password,
                    }
                   //need settings
                   
                    return res.send({
                        success: true,
                        user: userSettings});

                } else {
                    return res.send({error: "User don't found!"});
                }          
            }
        });
   // }
    
});


router.post('/user/:id/settings', function(req, res, next) {    
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
                if(user)
                {   
                    user.username = req.body.username;
                    user.email= req.body.email;
                    user.imageUrl = req.body.imageUrl;
                    if(req.body.password){
                        user.password = req.body.password;
                    }
                   //need settings
                   
                    user.save();
                    return res.send({
                        success: true});

                } else {
                    return res.send({error: "User don't found!"});
                }          
            }
        });
    //}
    
});



*/