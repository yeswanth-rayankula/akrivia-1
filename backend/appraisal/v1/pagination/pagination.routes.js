const express = require('express');

const verifyToken = require('../../middlewares/auth.js');
const { getRestaurants } = require('./pagination.controller.js');
const router = express.Router();


router.get('/', verifyToken, getRestaurants);

module.exports = router;
