var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.trucks
    .findAll({ limit: 3, include: [db.menu_items] })
    .then(function(data) {
      res.render('index', {
        msg: 'Welcome!',
        trucks: data
      });
    });
});

router.get('/trucks', function(req, res) {
  db.trucks.findAll({}).then(function(data) {
    res.render('truckManager', {
      msg: 'Welcome!',
      trucks: data
    });
  });
});

router.get('/trucks/:id', function(req, res) {
  db.trucks
    .findOne({ where: { id: req.params.id }, include: [db.menu_items] })
    .then(function(data) {
      res.render('menuManager', {
        truck: data
      });
    });
});

module.exports = router;
