const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Ruta para el registro de un nuevo usuario
router.post('/registro', authController.registro);

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.post('/logout', authController.logout);

module.exports = router;
