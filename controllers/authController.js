// Importar los modelos y dependencias necesarias
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Función para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña,
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    nuevoUsuario.contraseña = await bcrypt.hash(contraseña, salt);

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Función para iniciar sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Verificar si el email está registrado
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token de autenticación (por ejemplo, utilizando JWT)

    // Enviar la respuesta con el token
    res.json({ mensaje: 'Inicio de sesión exitoso', token: 'tu-token-de-autenticacion' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
