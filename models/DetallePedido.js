const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pedido = require('./Pedido');
const Producto = require('./Producto');

const DetallePedido = sequelize.define('DetallePedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Pedido, key: 'id' },
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Producto, key: 'id' },
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'detalle_pedidos',
  timestamps: false,
});


module.exports = DetallePedido;
