const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario');

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
    references: { model: Usuario, key: 'id' },
  },
}, {
  tableName: 'carritos',
  timestamps: false,
});

module.exports = Carrito;
