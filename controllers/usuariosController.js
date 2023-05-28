// Importar el modelo y dependencias necesarias
const Usuario = require('../models/usuario');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.find();

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { nombre, correo, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    // Actualizar los datos del usuario
    usuario.nombre = nombre;
    usuario.correo = correo;
    usuario.contraseña = contraseña;

    // Guardar el usuario actualizado en la base de datos
    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un usuario existente
exports.eliminarUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    // Eliminar el usuario de la base de datos
    await usuario.remove();

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
