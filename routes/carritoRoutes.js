const express = require('express');
const router = express.Router();
const carritoController = require('../../controllers/carritoController');

// Ruta para obtener el carrito de un usuario
router.get('/carrito', carritoController.obtenerCarrito);

// Ruta para agregar un producto al carrito
router.post('/carrito/agregar', carritoController.agregarProducto);

// Ruta para eliminar un producto del carrito
router.delete('/carrito/:productoId', carritoController.eliminarProducto);

// Ruta para vaciar el carrito
router.delete('/carrito/vaciar', carritoController.vaciarCarrito);

module.exports = router;
