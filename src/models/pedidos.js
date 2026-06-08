import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Pedidos = sequelize.define('Pedidos', {
  fecha: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  total: { 
    type: DataTypes.INTEGER(10),
    validate: { min: 0 } 
  }
});

export default Pedidos;