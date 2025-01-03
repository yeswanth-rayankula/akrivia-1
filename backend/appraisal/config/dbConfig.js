require('dotenv').config();
const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

Model.knex(knex);

const db = async () => {
  try {
 
    console.log('Database connection established!');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

module.exports = { db, knex };
