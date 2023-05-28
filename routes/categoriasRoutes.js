const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Ruta para obtener todas las categorías
router.get('/categorias', categoriaController.obtenerCategorias);

// Ruta para obtener una categoría por su ID
router.get('/categorias/:categoriaId', categoriaController.obtenerCategoriaPorId);

// Ruta para crear una nueva categoría
router.post('/categorias', categoriaController.crearCategoria);

// Ruta para actualizar una categoría por su ID
router.put('/categorias/:categoriaId', categoriaController.actualizarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/categorias/:categoriaId', categoriaController.eliminarCategoria);

module.exports = router;
