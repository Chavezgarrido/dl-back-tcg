const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Carrito = require('./Carrito');
const CarritoProducto = require('./CarritoProducto');
const Pedido = require('./Pedido');
const DetallePedido = require('./DetallePedido');


Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

Producto.belongsTo(Usuario, { foreignKey: 'id_vendedor', as: 'vendedor' });
Usuario.hasMany(Producto, { foreignKey: 'id_vendedor', as: 'productosVendidos' });

Carrito.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarioCarrito' });

Carrito.belongsToMany(Producto, {
  through: CarritoProducto,
  foreignKey: 'id_carrito',
  otherKey: 'id_producto',
  as: 'productosEnCarrito',
});

Producto.belongsToMany(Carrito, {
  through: CarritoProducto,
  foreignKey: 'id_producto',
  otherKey: 'id_carrito',
  as: 'carritosConProducto',
});

Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarioPedido' });
Usuario.hasMany(Pedido, { foreignKey: 'id_usuario', as: 'pedidos' });

DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedido' });
Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido', as: 'detalles' });

DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
Producto.hasMany(DetallePedido, { foreignKey: 'id_producto', as: 'detallesPedidos' });

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Producto,
  Carrito,
  CarritoProducto,
  Pedido,
  DetallePedido,
};
