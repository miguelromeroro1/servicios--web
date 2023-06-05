const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Importar el modelo de usuario
const Usuario = require('./models/usuario');

// Importar las rutas
const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const authRoutes = require('./routes/authRoutes');

// Rutas
app.use('/serviciosweb/categorias', categoriasRoutes);
app.use('/serviciosweb/usuarios', usuariosRoutes);
app.use('/serviciosweb/pedidos', pedidosRoutes);
app.use('/serviciosweb/carrito', carritoRoutes);
app.use('/serviciosweb/auth', authRoutes);

// Rutas para productos
app.use('/serviciosweb/productos', require('./routes/productosRoutes'));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a nolonecesito.com');
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
