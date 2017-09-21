var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var ProjectModel =  require('../models').ProjectModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');


router.get('/project/:title', function(req, res, next) {
    if(!req.params.title){
        return res.send({ error: 'Incorrected data' });
    }
        ProjectModel.findOne({'title': req.params.title} , function (err, project) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                if(project)
                {                
                                        
                    return res.send({
                        success: true,
                        project: project});

                } else {
                    return res.send({error: "Project don't found!"});
                }          
            }
        });
});


router.post('/create_project',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
           if(user)
           {   
                        
                ProjectModel.find({'title': req.body.title} , function (err, projects) {
                    if (err) {
                        res.statusCode = 500;
                        log.error('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        if(projects.length === 0)
                        {                
                            
                            var newProject = {
                                title: req.body.title,
                                description: req.body.description,
                                budget:req.body.budget,
                                imageUrl:req.body.imageUrl,
                                completionDate: req.body.completionDate,
                                author: user.id
                            };
                            
                            
                            ProjectModel.create(newProject, function(err, item) {
                                if(!err){
                                    return res.send({
                                        success: true,
                                        project: newProject});
                                }
                                
                            });
                        } else {
                            return res.send({error: 'Project exists!'});
                        }          
                    }
                });

           } else {
               return res.send({error: "User don't found!"});
           }          
       }
   } )(req, res, next)  
 });


router.post('/create_project', function(req, res, next) {
    if(!req.body.title || !req.body.description || !req.body.budget){
        return res.send({ error: 'Incorrected data' });
    }
    ProjectModel.find({'title': req.body.title} , function (err, projects) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(projects.length === 0)
            {                
                
                var newProject = {
                    title: req.body.title,
                    description: req.body.description,
                    budget:req.body.budget,

                };
                
                
                ProjectModel.create(newProject, function(err, item) {
                    if(!err){
                        return res.send({
                            success: true,
                            project: newProject});
                    }
                    
                });
            } else {
                return res.send({error: 'Project exists!'});
            }          
        }
    });
});



module.exports = router;
