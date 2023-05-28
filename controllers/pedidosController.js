// Importar los modelos y dependencias necesarias
const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
  try {
    // Obtener todos los pedidos de la base de datos
    const pedidos = await Pedido.find();

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const { userId, productos } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    // Verificar si los productos existen
    const productosIds = productos.map((producto) => producto.producto);
    const productosExistentes = await Producto.find({ _id: { $in: productosIds } });
    if (productosExistentes.length !== productos.length) {
      return res.status(404).json({ mensaje: 'Uno o más productos no existen' });
    }

    // Crear el pedido
    const nuevoPedido = new Pedido({
      usuario: userId,
      productos,
    });

    // Guardar el pedido en la base de datos
    await nuevoPedido.save();

    res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    // Obtener el pedido por su ID
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'El pedido no existe' });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar el estado de un pedido
exports.actualizarEstadoPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const { estado } = req.body;

    // Verificar si el pedido existe
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'El pedido no existe' });
    }

    // Actualizar el estado del pedido
    pedido.estado = estado;

    // Guardar el pedido actualizado en la base de datos
    await pedido.save();

    res.json({ mensaje: 'Estado del pedido actualizado exitosamente', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    // Verificar si el pedido existe
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'El pedido no existe' });
    }

    // Eliminar el pedido de la base de datos
    await pedido.remove();

    res.json({ mensaje: 'Pedido eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
