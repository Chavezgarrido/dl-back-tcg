require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/productos', require('./routes/product.routes'));
app.use('/api/usuarios', require('./routes/user.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/carrito', require('./routes/carrito.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/buscar', require('./routes/buscar.routes'));

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del Marketplace funcionando' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
})();
