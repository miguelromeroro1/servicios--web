const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/productos', productosController.obtenerProductos);

// Ruta para obtener un producto por su ID
router.get('/productos/:productoId', productosController.obtenerProductoPorId);

// Ruta para crear un nuevo producto
router.post('/productos', productosController.crearProducto);

// Ruta para actualizar un producto por su ID
router.put('/productos/:productoId', productosController.actualizarProducto);

// Ruta para eliminar un producto por su ID
router.delete('/productos/:productoId', productosController.eliminarProducto);

module.exports = router;
