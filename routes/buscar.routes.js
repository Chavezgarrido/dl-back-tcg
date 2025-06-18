const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Parámetro 'q' requerido" });
  }

  const productosSimulados = [
    { id: 1, nombre: "Carta Dragón", precio: 1500, imagen_url: "url_imagen_1" },
    { id: 2, nombre: "Deck Dragón", precio: 3500, imagen_url: "url_imagen_2" }
  ];

  const resultados = productosSimulados.filter(p =>
    p.nombre.toLowerCase().includes(q.toLowerCase())
  );

  res.json(resultados);
});

module.exports = router;
