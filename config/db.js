require('dotenv').config();
const { Sequelize } = require('sequelize');

const password = String(process.env.DB_PASSWORD);  

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  password,         
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
