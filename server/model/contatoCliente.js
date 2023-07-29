const Sequelize = require('sequelize');
const database = require('../db')

const ContatoCliente = database.define('ContatoCliente', {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ClienteId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    ContatoId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'ContatoCliente', // Defina o nome da tabela que você quer mapear
    timestamps: false, // Se não houver colunas de createdAt e updatedAt na tabela, defina como false
    underscored: false, // Use snake_case para o nome das colunas (opcional)
  });
  
  module.exports = ContatoCliente;