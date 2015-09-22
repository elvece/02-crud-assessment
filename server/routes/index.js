var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
