const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

const Categoria = mongoose.model('Categorias', categoriaSchema);

module.exports = Categoria;

