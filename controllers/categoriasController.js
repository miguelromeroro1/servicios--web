// Importar el modelo y dependencias necesarias
const Categoria = require('../models/categoria');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
  try {
    // Obtener todas las categorías de la base de datos
    const categorias = await Categoria.find();

    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Verificar si la categoría ya existe
    const categoriaExistente = await Categoria.findOne({ nombre });
    if (categoriaExistente) {
      return res.status(400).json({ mensaje: 'La categoría ya existe' });
    }

    // Crear una nueva categoría
    const nuevaCategoria = new Categoria({ nombre });

    // Guardar la nueva categoría en la base de datos
    await nuevaCategoria.save();

    res.status(201).json({ mensaje: 'Categoría creada exitosamente', categoria: nuevaCategoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar una categoría existente
exports.actualizarCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const { nombre } = req.body;

    // Verificar si la categoría existe
    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'La categoría no existe' });
    }

    // Actualizar el nombre de la categoría
    categoria.nombre = nombre;

    // Guardar la categoría actualizada en la base de datos
    await categoria.save();

    res.json({ mensaje: 'Categoría actualizada exitosamente', categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar una categoría existente
exports.eliminarCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;

    // Verificar si la categoría existe
    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'La categoría no existe' });
    }

    // Eliminar la categoría de la base de datos
    await categoria.remove();

    res.json({ mensaje: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
