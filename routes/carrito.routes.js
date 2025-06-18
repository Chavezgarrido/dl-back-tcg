const express = require('express');
const router = express.Router();
const { Carrito, CarritoProducto, Producto } = require('../models');

// Obtener carrito del usuario (GET /api/carrito/:id)
router.get('/:id', async (req, res) => {
  const id_usuario = req.params.id;

  try {
    // Buscar carrito del usuario
    const carrito = await Carrito.findOne({
      where: { id_usuario },
      include: {
        model: Producto,
        through: { attributes: ['cantidad'] }
      }
    });

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Formatear respuesta
    const productos = carrito.Productos.map(p => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.CarritoProducto.cantidad,
      precio_unitario: p.precio
    }));

    const total = productos.reduce((acc, prod) => acc + prod.precio_unitario * prod.cantidad, 0);

    res.json({
      id_usuario: carrito.id_usuario,
      productos,
      total
    });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Agregar producto al carrito (POST /api/carrito/:id/agregar)
router.post('/:id/agregar', async (req, res) => {
  const id_usuario = req.params.id;
  const { id_producto, cantidad = 1 } = req.body;

  try {
    let carrito = await Carrito.findOne({ where: { id_usuario } });

    if (!carrito) {
      carrito = await Carrito.create({ id_usuario });
    }

    const [item, created] = await CarritoProducto.findOrCreate({
      where: { id_carrito: carrito.id, id_producto },
      defaults: { cantidad }
    });

    if (!created) {
      item.cantidad += cantidad;
      await item.save();
    }

    res.json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar producto del carrito (DELETE /api/carrito/:id/eliminar)
router.delete('/:id/eliminar', async (req, res) => {
  const id_usuario = req.params.id;
  const { id_producto } = req.body;

  try {
    const carrito = await Carrito.findOne({ where: { id_usuario } });

    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

    const deleted = await CarritoProducto.destroy({
      where: {
        id_carrito: carrito.id,
        id_producto
      }
    });

    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Finalizar compra (POST /api/carrito/:id/finalizar)
router.post('/:id/finalizar', async (req, res) => {
  const id_usuario = req.params.id;
  const { direccion_envio, metodo_pago } = req.body;

  try {
    const carrito = await Carrito.findOne({
      where: { id_usuario },
      include: {
        model: Producto,
        through: { attributes: ['cantidad'] }
      }
    });

    if (!carrito || carrito.Productos.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const detalles = carrito.Productos.map(p => ({
      id_producto: p.id,
      nombre: p.nombre,
      cantidad: p.CarritoProducto.cantidad,
      precio_unitario: p.precio
    }));

    const total = detalles.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);

    // Aquí deberías crear un pedido real en base de datos si lo deseas

    // Limpiar carrito después de finalizar
    await CarritoProducto.destroy({ where: { id_carrito: carrito.id } });

    res.json({
      mensaje: 'Compra finalizada con éxito',
      pedido: {
        id_usuario: Number(id_usuario),
        fecha_pedido: new Date().toISOString(),
        estado: 'pendiente',
        direccion_envio,
        metodo_pago,
        detalles,
        total
      }
    });
  } catch (error) {
    console.error('Error al finalizar compra:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
