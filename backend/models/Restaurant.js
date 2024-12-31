const { Model } = require('objection');
const db = require('../Database/Dbconnect.js');

Model.knex(db);

class Restaurant extends Model {

  static get tableName() {
    return 'restaurants';
  }

  static get idColumn() {
    return 'id';
  }

  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['restaurant_name', 'rating', 'average_price', 'location'], 
      properties: {
        id: { type: 'integer' }, 
        restaurant_name: { type: 'string', minLength: 1, maxLength: 255 },
        rating: { type: 'number', minimum: 0, maximum: 5 }, 
        average_price: { type: 'number' }, 
        location: { type: 'string', minLength: 1, maxLength: 255 }, 
      },
    };
  }
}

module.exports = Restaurant;
