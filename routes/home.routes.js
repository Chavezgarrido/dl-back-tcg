const express = require('express');
const router = express.Router();
const { Categoria, Producto } = require('../models'); // Importa tus modelos Sequelize

// Ruta raíz
router.get('/', (req, res) => {
  res.send('Bienvenido a la API de TCG Marketplace');
});

// Obtener todas las categorías desde DB
router.get('/api/categories', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: ['id', 'nombre'],
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Obtener productos nuevos - por ejemplo los 5 más recientes
router.get('/api/products/new', async (req, res) => {
  try {
    const productosNuevos = await Producto.findAll({
      limit: 5,
      order: [['id', 'DESC']],
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'stock', 'imagen_url', 'categoriaId'],
    });
    res.json(productosNuevos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos nuevos' });
  }
});

module.exports = router;
