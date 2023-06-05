const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriasController.js');

// Ruta para obtener todas las categorías
router.get('/categorias', categoriaController.getCategorias);

// Ruta para obtener una categoría por su ID
router.get('/categorias', categoriaController.getCategorias);


// Ruta para crear una nueva categoría
router.post('/categorias', categoriaController.crearCategoria);

// Ruta para actualizar una categoría por su ID
router.put('/categorias/:categoriaId', categoriaController.actualizarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/categorias/:categoriaId', categoriaController.eliminarCategoria);

module.exports = router;
