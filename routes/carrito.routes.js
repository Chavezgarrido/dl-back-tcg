const express = require('express');
const router = express.Router();

// GET carrito del usuario
router.get('/:id', (req, res) => {
  const id_usuario = req.params.id;
  res.json({
    id_usuario: Number(id_usuario),
    productos: [
      { id: 1, nombre: "Carta Dragón", cantidad: 2, precio_unitario: 1500 }
    ],
    total: 3000
  });
});

// POST agregar producto al carrito
router.post('/:id/agregar', (req, res) => {
  const id_usuario = req.params.id;
  const { id_producto, cantidad } = req.body;
  res.json({
    mensaje: "Producto agregado al carrito",
    carrito: {
      id_usuario: Number(id_usuario),
      productos: [
        { id: id_producto, nombre: "Carta Dragón", cantidad, precio_unitario: 1500 }
      ],
      total: 1500 * cantidad
    }
  });
});

// POST finalizar compra
router.post('/:id/finalizar', (req, res) => {
  const id_usuario = req.params.id;
  const { direccion_envio, metodo_pago } = req.body;
  res.json({
    mensaje: "Compra finalizada con éxito",
    pedido: {
      id: 1,
      id_usuario: Number(id_usuario),
      fecha_pedido: new Date().toISOString(),
      estado: "pendiente",
      detalles: [
        { id_producto: 1, nombre: "Carta Dragón", cantidad: 2, precio_unitario: 1500 }
      ],
      total: 3000
    }
  });
});

module.exports = router;
