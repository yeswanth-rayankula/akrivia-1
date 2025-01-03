const express = require('express');
const { registerUser } = require('./register.controller');
const router = express.Router();

router.post('/', registerUser);

module.exports = router;
