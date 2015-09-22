var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercises', function(req, res, next) {
  Exercise.find(function(err, data){
    if (err){
      res.json({'Error': err});
    } else {
      res.json(data);
    }
  });
});

router.get('/exercise/:id', function(req, res, next){
  Exercise.findById(req.params.id, function(err, data){
    if (err){
      res.json({'Error': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/exercises', function(req, res, next){
  var newExercise = new Exercise ({
    name: req.body.name,
    description: req.body.description,
    tags: [req.body.tags]
  });
  newExercise.save(function(err){
    if (err){
      res.json({'Error': err});
    } else {
      res.json({'Success': newExercise});
    }
  });
});



module.exports = router;

//tags array will need to be split: test[0].split(",")

