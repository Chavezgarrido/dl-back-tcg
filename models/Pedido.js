const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: 'id' },
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendiente',
  }
}, {
  tableName: 'pedidos',
  timestamps: false,
});


module.exports = Pedido;
