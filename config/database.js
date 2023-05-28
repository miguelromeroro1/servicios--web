// Importar la dependencia mongoose
const mongoose = require('mongoose');

// Función para establecer la conexión con la base de datos
const conectarDB = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect('mongodb://localhost/nolonecesito', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Conexión exitosa con la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos', error);
    process.exit(1); // Detener la aplicación en caso de error de conexión
  }
};

// Exportar la función de conexión
module.exports = conectarDB;
