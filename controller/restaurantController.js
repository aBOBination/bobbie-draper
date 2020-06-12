var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.restaurants.findAll({}).then(function(data) {
    res.render('index', {
      msg: 'Welcome!',
      restaurants: data,
    });
  });
});

router.get('/ftListings', function(req, res) {
  db.restaurants.findAll({}).then(function(data) {
    res.render('ftListings', {
      msg: 'Welcome!',
      restaurants: data,
    });
  });
});

router.get('/restaurants/:id', function(req, res) {
  db.restaurants.findOne({ where: { id: req.params.id } }).then(function(data) {
    res.render('example', {
      restaurant: data,
    });
  });
});

router.get('/api/restaurants', function(req, res) {
  db.restaurants
    .findAll({
      include: [
        {
          model: db.menus,
          include: [db.menu_items],
        },
      ],
    })
    .then(function(data) {
      res.json(data);
    });
});

router.post('/api/restaurants', function(req, res) {
  db.restaurants.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.delete('/api/restaurants/:id', function(req, res) {
  db.restaurants.destroy({ where: { id: req.params.id } }).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
