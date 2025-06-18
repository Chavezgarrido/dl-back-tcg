const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Carrito = require('./Carrito');
const Producto = require('./Producto');

const CarritoProducto = sequelize.define('CarritoProducto', {
  id_carrito: {
    type: DataTypes.INTEGER,
    references: { model: Carrito, key: 'id' }, 
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: { model: Producto, key: 'id' },
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'carrito_productos',
  timestamps: false,
});

Carrito.belongsToMany(Producto, {
  through: CarritoProducto,
  foreignKey: 'id_carrito',
  otherKey: 'id_producto',
});

Producto.belongsToMany(Carrito, {
  through: CarritoProducto,
  foreignKey: 'id_producto',
  otherKey: 'id_carrito',
});

module.exports = CarritoProducto;
