// Importar los modelos y dependencias necesarias
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

// Obtener el carrito de un usuario
exports.getCarrito = async (req, res) => {
  try {
    const { userId } = req.params;

    // Obtener el carrito del usuario
    const carrito = await Carrito.findOne({ usuario: userId }).populate('productos.producto');

    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Agregar un producto al carrito
exports.agregarProducto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productoId, cantidad } = req.body;

    // Verificar si el producto existe
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'El producto no existe' });
    }

    // Obtener el carrito del usuario
    let carrito = await Carrito.findOne({ usuario: userId });

    // Si no hay carrito existente, crear uno nuevo
    if (!carrito) {
      carrito = new Carrito({ usuario: userId, productos: [] });
    }

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.productos.find(
      (item) => item.producto.toString() === productoId
    );
    if (productoExistente) {
      // Actualizar la cantidad del producto
      productoExistente.cantidad += cantidad;
    } else {
      // Agregar el producto al carrito
      carrito.productos.push({ producto: productoId, cantidad });
    }

    // Guardar el carrito actualizado en la base de datos
    await carrito.save();

    res.json({ mensaje: 'Producto agregado al carrito exitosamente', carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un producto del carrito
exports.eliminarProducto = async (req, res) => {
  try {
    const { userId, productoId } = req.params;

    // Verificar si el carrito existe
    const carrito = await Carrito.findOne({ usuario: userId });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'El carrito no existe' });
    }

    // Verificar si el producto está en el carrito
    const productoIndex = carrito.productos.findIndex(
      (item) => item.producto.toString() === productoId
    );
    if (productoIndex === -1) {
      return res.status(404).json({ mensaje: 'El producto no está en el carrito' });
    }

    // Eliminar el producto del carrito
    carrito.productos.splice(productoIndex, 1);

    // Guardar el carrito actualizado en la base de datos
    await carrito.save();

    res.json({ mensaje: 'Producto eliminado del carrito exitosamente', carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
