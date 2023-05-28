const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
