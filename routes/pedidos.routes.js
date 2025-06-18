const express = require('express');
const router = express.Router();


// GET /api/pedidos/usuarios/:id — obtener listado de pedidos de usuario
router.get('/usuarios/:id/pedidos', async (req, res) => {
  const userId = req.params.id;
  try {
    const pedidos = [
      { id: 1, fecha_pedido: '2025-06-15', estado: 'Pendiente' },
      { id: 2, fecha_pedido: '2025-06-10', estado: 'Enviado' },
    ];
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// GET /api/pedidos/usuarios/:id/pedidos/:pedidoId — detalles del pedido
router.get('/usuarios/:id/pedidos/:pedidoId', async (req, res) => {
  const { id, pedidoId } = req.params;
  try {
    const pedidoDetalle = {
      id: Number(pedidoId),
      id_usuario: Number(id),
      fecha_pedido: '2025-06-15',
      estado: 'Pendiente',
      detalles: [
        { id_producto: 10, nombre: 'Carta Dragón', cantidad: 2, precio_unitario: 500 },
        { id_producto: 12, nombre: 'Mazo Básico', cantidad: 1, precio_unitario: 1500 }
      ]
    };
    res.json(pedidoDetalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles del pedido' });
  }
});

// PUT /api/pedidos/usuarios/:id/pedidos/:pedidoId/estado — actualizar estado de pedido
router.put('/usuarios/:id/pedidos/:pedidoId/estado', async (req, res) => {
  const { id, pedidoId } = req.params;
  const { estado } = req.body;

  if (!estado) return res.status(400).json({ error: 'El campo estado es obligatorio' });

  try {
    
    const pedidoActualizado = {
      id: Number(pedidoId),
      estado: estado
    };
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado del pedido' });
  }
});

module.exports = router;
