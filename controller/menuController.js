var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.render('index', {
      msg: 'Welcome!',
      examples: dbExamples
    });
  });
});

router.get('/example/:id', function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(
    dbExample
  ) {
    res.render('example', {
      example: dbExample
    });
  });
});

router.get('/api/examples', function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.json(dbExamples);
  });
});

router.post('/api/examples', function(req, res) {
  db.Example.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});

router.delete('/api/examples/:id', function(req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function(
    dbExample
  ) {
    res.json(dbExample);
  });
});

module.exports = router;
