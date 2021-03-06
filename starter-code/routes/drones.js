'use strict';

const express = require('express');

// require the Drone model here

const router = express.Router();

const Drone = require('../models/drone');

router.get('/', (req, res, next) => {
  // Iteration #2

  Drone.find({}, (err, drones) => {
    if (err) {
      return next(err);
    }
    res.render('./drones/index', {
      drones: drones
    });
  });
});

router.get('/new', (req, res, next) => {
  // Iteration #3
  res.render('drones/new');
});

router.post('/', (req, res, next) => {
  const droneInfo = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  // Create a new Product with the params
  const newDrone = new Drone(droneInfo);

  newDrone.save((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/drones');
  });
});

module.exports = router;
