import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Clientes = sequelize.define('Clientes', {
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  apellido: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  telefono: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

export default Clientes;