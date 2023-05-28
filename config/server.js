const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/productos', require('./api/routes/productosRoutes'));
app.use('/api/categorias', require('./api/routes/categoriasRoutes'));
app.use('/api/usuarios', require('./api/routes/usuariosRoutes'));
app.use('/api/pedidos', require('./api/routes/pedidosRoutes'));
app.use('/api/carrito', require('./api/routes/carritoRoutes'));
app.use('/api/auth', require('./api/routes/authRoutes'));

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
