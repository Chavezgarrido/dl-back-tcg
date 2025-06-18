const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_para_jwt';

exports.register = async (req, res) => {
  try {
    const { email, contraseña, nombre, apellido, tipo_usuario } = req.body;

    if (!email || !contraseña || !nombre || !apellido || !tipo_usuario) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newUser = await Usuario.create({
      email,
      contraseña: hashedPassword,
      nombre,
      apellido,
      tipo_usuario,
    });

    const { contraseña: _, ...userData } = newUser.toJSON();
    res.status(201).json({ message: 'Usuario creado', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
};
