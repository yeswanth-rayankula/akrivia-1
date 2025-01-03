const { Model } = require('objection');


class Task1 extends Model {
  static get tableName() {
    return 'task1';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password', 'part_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 8 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
        part_id: { type: 'integer', minimum: 1, maximum: 5 },
      },
    };
  }

  
}

module.exports = Task1;
