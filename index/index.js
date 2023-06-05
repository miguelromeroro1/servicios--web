const express = require('express');
const app = express();

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Configurar middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas
app.use('/SERVICIOSWEB', authRoutes);
app.use('SERVICIOSWEB', carritoRoutes);
app.use('/SERVICIOSWEB', categoriaRoutes);
app.use('/SERVICIOSWEB', pedidosRoutes);
app.use('/SERVICIOSWEB', productosRoutes);
app.use('/SERVICIOSWEB', usuariosRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
