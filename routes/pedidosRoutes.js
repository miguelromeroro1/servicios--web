const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Ruta para obtener todos los pedidos
router.get('/pedidos', pedidosController.obtenerPedidos);

// Ruta para obtener un pedido por su ID
router.get('/pedidos/:pedidoId', pedidosController.obtenerPedidoPorId);

// Ruta para crear un nuevo pedido
router.post('/pedidos', pedidosController.crearPedido);

// Ruta para actualizar un pedido por su ID
router.put('/pedidos/:pedidoId', pedidosController.actualizarPedido);

// Ruta para eliminar un pedido por su ID
router.delete('/pedidos/:pedidoId', pedidosController.eliminarPedido);

module.exports = router;
