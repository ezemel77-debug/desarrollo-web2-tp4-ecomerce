import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);

// Función asíncrona para testear la salud de la conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos lista.');
  } catch (error) {
    console.error('❌ Error crítico:', error.message);
    process.exit(1); // Detenemos la app si no hay DB
  }
};
