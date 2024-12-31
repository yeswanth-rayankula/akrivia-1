const { Model } = require('objection');
const db = require('../Database/Dbconnect.js');

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'task1';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'pass'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        pass: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = User;
