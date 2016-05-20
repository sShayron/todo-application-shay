'use strict'

const models = require('../models');

module.exports = function(app) {
    const controller = {};
    
    
                        //routes
    
    //GET==============================================
    controller.find = app.get('/todos', function(req, res) {
       //find all on mongoose database
        models.todo
        .find(function(err, todos) {
            
            if (err)
                res.send(err);
                
                
            res.json(todos);//return fin all on a json
            }
        )
    });
    
    //POST=============================================
    app.post('/todos', function(req, res){
        
        models.todo
        .create({
            text: req.body.text,
            done: false
        }, function(err, todos) {
            if (err)
                res.send(err);
        
            // GET AND RETURN ALL AFTER DELETE
            models.todo
            .find(function(err, todos) {
                if (err)
                    res.send(err);
                    
                res.json(todos);
            });
        });
    });
    
    //DELETE==============================================
    app.delete('/todos/:todo_id', function(req, res) {
        
        models.todo
        .remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // GET AND RETURN ALL AFTER DELETE
            models.todo
            .find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    
    
        // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    
    return controller;
}
    