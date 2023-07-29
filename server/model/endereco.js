const Sequelize = require('sequelize');
const database = require('../db')

const Endereco = database.define('Endereco', {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Logradouro: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    Bairro: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    Cidade: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    Estado: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    Pais: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'Endereco', // Defina o nome da tabela que você quer mapear
    timestamps: false, // Se não houver colunas de createdAt e updatedAt na tabela, defina como false
    underscored: true, // Use snake_case para o nome das colunas (opcional)
  });
  
  module.exports = Endereco;