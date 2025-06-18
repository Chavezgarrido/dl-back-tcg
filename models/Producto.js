const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./Categoria');
const Usuario = require('./usuario');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  imagen_url: {
    type: DataTypes.STRING,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Categoria, key: 'id' },
  },
  id_vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: 'id' },
  },
}, {
  tableName: 'productos',
  timestamps: false,
});

module.exports = Producto;
