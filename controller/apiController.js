var express = require('express');
var router = express.Router();
var db = require('../models');
const Sequelize = require('sequelize');
const { response } = require('express');
const Op = Sequelize.Op;

router.get('/api/trucks', function(req, res) {
  db.trucks.findAll({ include: [db.menu_items] }).then(function(data) {
    res.json(data);
  });
});

router.get('/api/trucks/limit', function(req, res) {
  db.trucks
    .findAll({
      limit: 9,
      include: [db.menu_items],
      order: [['createdAt', 'DESC']]
    })
    .then(function(data) {
      res.json(data);
    });
});

router.post('/api/search', function(req, res) {
  var term = req.body.term;
  db.trucks
    .findAll({
      include: [
        {
          model: db.menu_items,
          where: {
            name: {
              [Op.like]: '%' + term + '%'
            }
          }
        }
      ]
    })
    .then(function(truckData) {
      var ids = [];
      truckData.forEach((truck) => {
        ids.push(truck.id);
      });
      db.trucks
        .findAll({
          where: {
            id: {
              [Op.in]: ids
            }
          },
          include: [db.menu_items]
        })
        .then(function(data) {
          res.json(data);
        });
    });
});

router.get('/api/trucks/:id', function(req, res) {
  db.trucks
    .findOne({ where: { id: req.params.id }, include: [db.menu_items] })
    .then(function(data) {
      res.json(data);
    });
});

router.get('/api/users', function(req, res) {
  db.users.findAll({}).then(function(data) {
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

router.post('/api/newUser', function(req, res) {
  db.users.create(req.body).then(function(data) {
    res.json(data);
  });
});

router.get('/api/trucks/:id', function(req, res) {
  db.trucks.update({ where: { id: req.params.id } }).then(function(data) {
    res.json(data);
  });
});

router.put('/api/trucks/', function(req, res) {
  db.trucks
    .update(
      {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phone_number: req.body.phone_number,
        img_url: req.body.img_url,
        description: req.body.description
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
    .then(function(data) {
      res.json(data);
    });
});

router.delete('/api/trucks/:id', function(req, res) {
  db.menu_items.destroy({ where: { truckId: req.params.id } }).then(function() {
    db.trucks.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });
});

router.delete('/api/menu-items/:id', function(req, res) {
  db.menu_items.destroy({ where: { id: req.params.id } }).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
