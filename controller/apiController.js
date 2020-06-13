var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/api/trucks', function(req, res) {
  db.trucks.findAll({ include: [db.menu_items] }).then(function(data) {
    res.json(data);
  });
});

router.post('/api/trucks', function(req, res) {
  db.trucks.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.post('/api/user', function(req, res) {
  db.users.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.get('/api/trucks/:id', function(req, res) {
  db.trucks.update({ where: { id: req.params.id } }).then(function(data) {
    res.json(data);
  });
});

router.delete('/api/trucks/:id', function(req, res) {
  db.trucks.destroy({ where: { id: req.params.id } }).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
