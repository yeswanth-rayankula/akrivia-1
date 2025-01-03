const User = require('../../models/userModel.js');
const Restaurant = require('../../models/restaurantModel.js');

async function restaurantService({ userId, page, pageSize, search, sortOrder }) {
  const offset = (page - 1) * pageSize;

  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const partitionId = user.part_id;

    let restaurantsQuery = Restaurant.query()
      .where('part_id', partitionId)
      .limit(pageSize)
      .offset(offset);

    if (search) {
      restaurantsQuery = restaurantsQuery.whereRaw('LOWER(restaurant_name) LIKE LOWER(?)', [`%${search}%`]);
    }

    if (sortOrder === 'asc') {
      restaurantsQuery = restaurantsQuery.orderBy('average_price', 'asc');
    } else if (sortOrder === 'desc') {
      restaurantsQuery = restaurantsQuery.orderBy('average_price', 'desc');
    }

    let totalRestaurantsQuery = Restaurant.query().where('part_id', partitionId);
    if (search) {
      totalRestaurantsQuery = totalRestaurantsQuery.whereRaw('LOWER(restaurant_name) LIKE LOWER(?)', [`%${search}%`]);
    }

    const totalRestaurants = await totalRestaurantsQuery.resultSize();
    const totalPages = Math.ceil(totalRestaurants / pageSize);

    const paginatedRestaurants = await restaurantsQuery;

    return {
      totalRestaurants,
      totalPages,
      paginatedRestaurants
    };
  } catch (err) {
    throw new Error('An error occurred while fetching restaurants');
  }
}

module.exports = restaurantService; 
