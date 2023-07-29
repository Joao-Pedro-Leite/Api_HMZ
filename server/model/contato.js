const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importe a instância do Sequelize já configurada

const Contato = sequelize.define('Contato', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Cargo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Telefone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'Contato', // Nome da tabela no banco de dados (caso seja diferente do nome do modelo)
  timestamps: false, // Desativa a criação automática de campos createdAt e updatedAt
});

module.exports = Contato;