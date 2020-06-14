var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/api/trucks', function(req, res) {
  db.trucks.findAll({ include: [db.menu_items] }).then(function(data) {
    res.json(data);
  });
});

router.get('/api/trucks/:id', function(req, res) {
  db.trucks
    .findOne({ where: { id: req.params.id }, include: [db.menu_items] })
    .then(function(data) {
      res.json(data);
    });
});

router.post('/api/menu-items', function(req, res) {
  db.menu_items.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.post('/api/trucks', function(req, res) {
  db.trucks.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.post('/api/user', function(req, res) {
  db.users
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then(function(checkRes) {
      res.json(checkRes);

      if (checkRes === null) {
        db.users.create(req.body).then(function(data) {
          res.json(data);
        });
        router.get('/', function(req, res) {
          res.render('truckManager');
        });
      } else if (req.body.password === checkRes.dataValues.password) {
        router.get('/', function(req, res) {
          res.render('truckManager');
        });
      }
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
