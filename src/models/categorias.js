import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Categorias = sequelize.define('Categorias', {
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  descripcion: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

export default Categorias;