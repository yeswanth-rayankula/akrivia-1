const express = require('express');
const router = express.Router();
const {
 
  getRestaurantsWithKeysetPagination,

} = require('../Controller/restaurantController.js');
const { verifyToken } = require('../middleware/auth');


router.get('/',verifyToken, getRestaurantsWithKeysetPagination);


module.exports = router;
