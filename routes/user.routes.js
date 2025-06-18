const express = require('express');
const router = express.Router();

// GET /api/usuarios/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    id: Number(id),
    email: "usuario@example.com",
    nombre: "Nombre",
    apellido: "Apellido",
    tipo_usuario: "comprador",
    fecha_registro: "2025-06-17"
  });
});

// GET /api/usuarios/:id/pedidos
router.get('/:id/pedidos', (req, res) => {
  const id = req.params.id;
  res.json([
    { id: 1, fecha_pedido: "2025-06-10", estado: "entregado" },
    { id: 2, fecha_pedido: "2025-06-12", estado: "procesando" }
  ]);
});

// GET /api/usuarios/:id/pedidos/:pedidoId
router.get('/:id/pedidos/:pedidoId', (req, res) => {
  const { id, pedidoId } = req.params;
  res.json({
    id: Number(pedidoId),
    id_usuario: Number(id),
    fecha_pedido: "2025-06-10",
    estado: "entregado",
    detalles: [
      { id_producto: 1, nombre: "Carta Dragón", cantidad: 2, precio_unitario: 1500 }
    ]
  });
});

// PUT /api/usuarios/:id/pedidos/:pedidoId/estado
router.put('/:id/pedidos/:pedidoId/estado', (req, res) => {
  const { id, pedidoId } = req.params;
  const { estado } = req.body;
  res.json({
    id: Number(pedidoId),
    estado
  });
});

// GET /api/usuarios/:id/compras
router.get('/:id/compras', (req, res) => {
  const id = req.params.id;
  res.json([
    { id: 1, fecha_pedido: "2025-06-10", estado: "entregado" },
    { id: 2, fecha_pedido: "2025-06-12", estado: "procesando" }
  ]);
});

// GET /api/usuarios/:id/compras/:pedidoId
router.get('/:id/compras/:pedidoId', (req, res) => {
  const { id, pedidoId } = req.params;
  res.json({
    id: Number(pedidoId),
    id_usuario: Number(id),
    fecha_pedido: "2025-06-10",
    estado: "entregado",
    detalles: [
      { id_producto: 1, nombre: "Carta Dragón", cantidad: 2, precio_unitario: 1500 }
    ],
    total: 3000
  });
});

module.exports = router;
