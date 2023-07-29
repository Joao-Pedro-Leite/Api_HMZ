const Sequelize = require('sequelize');
const database = require('../db')

const Cliente = database.define('CadastroClientes',
{
    Id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        uniqueKey: true,
        autoIncrement: true
    },
    Nome:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    Cnpj:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    EnderecoId:{
        type: Sequelize.INTEGER,
        allowNull: true, 
    },
    Ativo: {
        type: Sequelize.BOOLEAN, // Defina o tipo de dados para o campo "Ativo" como BOOLEAN (bit no SQL Server)
        allowNull: true,
    },
})

module.exports = Cliente