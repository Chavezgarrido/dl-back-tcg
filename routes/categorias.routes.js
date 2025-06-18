const express = require('express');
const router = express.Router();

// GET /api/categorias
router.get('/', (req, res) => {
  res.json([
    { id: 1, nombre: "Cartas" },
    { id: 2, nombre: "Accesorios" }
  ]);
});

// GET /api/categorias/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    id: Number(id),
    nombre: "Cartas"
  });
});

module.exports = router;
