const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:usuarioId', usuariosController.obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/usuarios', usuariosController.crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put('/usuarios/:usuarioId', usuariosController.actualizarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:usuarioId', usuariosController.eliminarUsuario);

module.exports = router;
