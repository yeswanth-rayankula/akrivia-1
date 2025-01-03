
const restaurantService = require('./pagination.service.js');

async function getRestaurants(req, res) {

  const { page = 1, pageSize = 10, search = '', sortOrder = 'none' } = req.query;
 
  try {
    const userId = req.user.id;

    const { totalRestaurants, totalPages, paginatedRestaurants } = await restaurantService({
      userId,
      page: Number(page),
      pageSize: Number(pageSize),
      search,
      sortOrder
    });

    res.json({
      page: Number(page),
      pageSize: Number(pageSize),
      totalRecords: totalRestaurants,
      totalPages,
      data: paginatedRestaurants,
      hasPrevious: page > 1,
      hasNext: page < totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getRestaurants
};
