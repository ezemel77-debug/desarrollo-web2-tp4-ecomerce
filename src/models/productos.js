import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Productos = sequelize.define('Productos', {
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  precio: { 
    type: DataTypes.DECIMAL(10, 2),
    validate: { min: 0 } 
  }
});

export default Productos;