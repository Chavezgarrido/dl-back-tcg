const express = require('express');
const router = express.Router();

// Importa modelos directamente
const Carrito = require('../models/Carrito');
const CarritoProducto = require('../models/CarritoProducto');
const Producto = require('../models/Producto');

// Obtener carrito del usuario (crea uno si no existe)
router.get('/:id', async (req, res) => {
  try {
    const id_usuario = req.params.id;

    // Buscar carrito existente
    let carrito = await Carrito.findOne({
      where: { id_usuario },
      include: {
        model: Producto,
        through: {
          attributes: ['cantidad'],
        },
      },
    });

    // Si no existe carrito, crearlo vacío
    if (!carrito) {
      carrito = await Carrito.create({ id_usuario });
      // Volver a cargar con include vacío
      carrito = await Carrito.findOne({
        where: { id_usuario },
        include: {
          model: Producto,
          through: {
            attributes: ['cantidad'],
          },
        },
      });
    }

    const productos = carrito.Productos.map(prod => ({
      id: prod.id,
      nombre: prod.nombre,
      cantidad: prod.CarritoProducto.cantidad,
      precio_unitario: prod.precio,
    }));

    const total = productos.reduce((acc, p) => acc + p.precio_unitario * p.cantidad, 0);

    res.json({ id_usuario: carrito.id_usuario, productos, total });
  } catch (error) {
    console.error('❌ Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar producto al carrito
router.post('/:id/agregar', async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const { id_producto, cantidad } = req.body;

    let carrito = await Carrito.findOne({ where: { id_usuario } });
    if (!carrito) {
      carrito = await Carrito.create({ id_usuario });
    }

    const [carritoProd, created] = await CarritoProducto.findOrCreate({
      where: {
        id_carrito: carrito.id,
        id_producto,
      },
      defaults: {
        cantidad,
      },
    });

    if (!created) {
      carritoProd.cantidad += cantidad;
      await carritoProd.save();
    }

    res.json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('❌ Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Eliminar producto del carrito
router.delete('/:id/eliminar', async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const { id_producto } = req.body;

    const carrito = await Carrito.findOne({ where: { id_usuario } });
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const deleted = await CarritoProducto.destroy({
      where: {
        id_carrito: carrito.id,
        id_producto,
      },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Producto no estaba en el carrito' });
    }

    return res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error('❌ Error eliminando producto del carrito:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Finalizar compra
router.post('/:id/finalizar', async (req, res) => {
  const { direccion_envio, metodo_pago } = req.body;
  const id_usuario = req.params.id;

  // Aquí puedes conectar tu lógica de pedidos si tienes un modelo Pedido
  res.json({
    mensaje: 'Compra finalizada con éxito',
    pedido: {
      id_usuario: Number(id_usuario),
      fecha_pedido: new Date().toISOString(),
      estado: 'pendiente',
      direccion_envio,
      metodo_pago,
    },
  });
});

module.exports = router;
