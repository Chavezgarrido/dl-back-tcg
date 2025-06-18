require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first'); 

const { Sequelize } = require('sequelize');

const password = String(process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  password,
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
