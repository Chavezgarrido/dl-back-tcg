const express = require('express');
const router = express.Router();

// POST /api/auth/registro
router.post('/registro', (req, res) => {
  const { email, contraseña, nombre, apellido, tipo_usuario } = req.body;
  res.json({
    id: 1,
    email,
    nombre,
    apellido,
    tipo_usuario,
    fecha_registro: new Date().toISOString()
  });
});

// POST /api/auth/inicio-sesion
router.post('/inicio-sesion', (req, res) => {
  const { email, contraseña } = req.body;
  res.json({
    token: "token-simulado",
    usuario: {
      id: 1,
      email,
      nombre: "Juan",
      apellido: "Pérez",
      tipo_usuario: "comprador"
    }
  });
});

module.exports = router;
