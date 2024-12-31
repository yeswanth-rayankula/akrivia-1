const Restaurant = require('../models/Restaurant.js');



exports.getRestaurantsWithKeysetPagination = async (req, res) => {
  const { lastId = 0, pageSize = 30 } = req.query;
   console.log("hi");
  try {
    const restaurants = await Restaurant.query()
      .where('id', '>', lastId)
      .orderBy('id', 'asc')
      .limit(pageSize);

    const hasMore = restaurants.length === Number(pageSize);

    res.json({
      lastId: restaurants.length ? restaurants[restaurants.length - 1].id : null,
      pageSize: Number(pageSize),
      hasMore,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch restaurants with keyset pagination.' });
  }
};

