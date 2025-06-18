const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const Usuario = require('../models/usuario');

exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        { model: Categoria, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre', 'apellido', 'email'] }
      ]
    });
    res.json(productos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [
        { model: Categoria, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre', 'apellido', 'email'] }
      ]
    });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: 'Error al crear producto', detalles: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
