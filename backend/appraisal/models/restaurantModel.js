const { Model } = require('objection');

class Restaurant extends Model {
  static get tableName() {
    return 'restaurants';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'location'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        location: { type: 'string', minLength: 1 },
        part_id:{ type: 'integer'}
      },
    };
  }
}

module.exports = Restaurant;
