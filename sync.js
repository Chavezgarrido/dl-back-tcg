const { sequelize } = require('./models');

async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos.');

    // Sincroniza todos los modelos (crea tablas si no existen)
    await sequelize.sync({ alter: true }); // alter:true actualiza tablas sin perder datos
    console.log('Modelos sincronizados correctamente.');

    process.exit(0);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

syncModels();
