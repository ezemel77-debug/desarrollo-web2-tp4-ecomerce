import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const UsuariosAdmin = sequelize.define('UsuariosAdmin', {
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

export default UsuariosAdmin;