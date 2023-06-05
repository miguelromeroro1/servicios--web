const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.getUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/:usuarioId', usuariosController.obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put('/:usuarioId', usuariosController.actualizarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/:usuarioId', usuariosController.eliminarUsuario);

module.exports = router;
