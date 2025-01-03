const express = require('express');
const { loginUserHandler } = require('./login.controller');
const router = express.Router();

router.post('/', loginUserHandler);

module.exports = router;
