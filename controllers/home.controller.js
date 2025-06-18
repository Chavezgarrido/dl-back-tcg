const { Producto, Categoria } = require('../models');

exports.getHome = async (req, res) => {
  try {
    const productosDestacados = await Producto.findAll({
      limit: 5,
      attributes: ['id', 'nombre', 'precio', 'imagen_url'],
      order: [['createdAt', 'DESC']], 
    });

    const categorias = await Categoria.findAll({
      attributes: ['id', 'nombre'],
    });

    res.json({
      productosDestacados,
      categorias,
    });
  } catch (error) {
    console.error('Error en getHome:', error);
    res.status(500).json({ error: 'Error al obtener datos para la home' });
  }
};
