const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// ✅ Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// ✅ Agregar nuevo producto
router.post('/agregar/:id_vendedor', async (req, res) => {
  try {
    const id_vendedor = Number(req.params.id_vendedor);
    const { nombre, categoriaId, precio, descripcion, stock, imagen_url } = req.body;

    const nuevoProducto = await Producto.create({
      nombre,
      categoriaId,
      precio,
      descripcion,
      stock,
      imagen_url,
      id_vendedor,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// ✅ Editar producto
router.put('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, categoriaId, precio, descripcion, stock, imagen_url } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.update({ nombre, categoriaId, precio, descripcion, stock, imagen_url });
    res.json(producto);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// ✅ Eliminar producto
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ mensaje: `Producto con id ${id} eliminado` });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// ✅ Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(producto);
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

module.exports = router;
