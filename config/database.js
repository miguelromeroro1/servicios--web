const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const productosController = require('./controllers/productosController');
const usuariosController = require('./controllers/usuariosController');

const app = express();
const puerto = 3000;

// Middleware para el análisis del cuerpo de las solicitudes
app.use(bodyParser.json());

// URL de conexión a la base de datos
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'nolonecesitoDB';

// Importar el modelo de usuarios
const Usuario = require('./models/usuarios');

// Función para establecer la conexión con la base de datos
const conectarDB = async () => {
  try {
    // Crear un cliente de MongoDB
    const client = new MongoClient(url, { useUnifiedTopology: true });

    // Conectar al servidor de MongoDB
    await client.connect();

    // Seleccionar la base de datos
    const db = client.db(dbName);

    console.log('Conexión exitosa con la base de datos');

    // Rutas para productos
    app.get('/SERVICIOSWEB/productos', productosController.getProductos);
    app.post('/SERVICIOSWEB/productos', productosController.crearProducto);
    app.put('/SERVICIOSWEB/productos/:productoId', productosController.actualizarProducto);
    app.delete('/SERVICIOSWEB/productos/:productoId', productosController.eliminarProducto);

    // Rutas para usuarios
    app.get('/SERVICIOSWEB/usuarios', usuariosController.getUsuarios);
    app.post('/SERVICIOSWEB/usuarios', usuariosController.crearUsuario);
    app.put('/SERVICIOSWEB/usuarios/:usuarioId', usuariosController.actualizarUsuario);
    app.delete('/SERVICIOSWEB/usuarios/:usuarioId', usuariosController.eliminarUsuario);

    // Manejador de errores
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Error interno del servidor');
    });

    // Iniciar el servidor
    app.listen(puerto, () => {
      console.log(`Servidor iniciado en el puerto ${puerto}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos', error);
    process.exit(1);
  }
};

// Llamar a la función para establecer la conexión
conectarDB();
