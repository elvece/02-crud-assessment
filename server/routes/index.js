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

module.exports = router;
