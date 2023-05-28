// Importar el modelo y dependencias necesarias
const Producto = require('../models/producto');

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    // Obtener todos los productos de la base de datos
    const productos = await Producto.find();

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, categoria } = req.body;

    // Crear un nuevo producto
    const nuevoProducto = new Producto({
      nombre,
      precio,
      descripcion,
      categoria,
    });

    // Guardar el producto en la base de datos
    await nuevoProducto.save();

    res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: nuevoProducto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    const { nombre, precio, descripcion, categoria } = req.body;

    // Verificar si el producto existe
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'El producto no existe' });
    }

    // Actualizar los datos del producto
    producto.nombre = nombre;
    producto.precio = precio;
    producto.descripcion = descripcion;
    producto.categoria = categoria;

    // Guardar el producto actualizado en la base de datos
    await producto.save();

    res.json({ mensaje: 'Producto actualizado exitosamente', producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un producto existente
exports.eliminarProducto = async (req, res) => {
  try {
    const { productoId } = req.params;

    // Verificar si el producto existe
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'El producto no existe' });
    }

    // Eliminar el producto de la base de datos
    await producto.remove();

    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
