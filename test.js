const sequelize = require('./config/db'); // o la ruta donde esté tu config.js

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();
