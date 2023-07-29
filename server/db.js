const Sequelize = require('sequelize')
const sequelize = new Sequelize('HMZ','meuProjeto','123456',{
    dialect: 'mssql',
    dialectModule: require('msnodesqlv8/lib/sequelize'),
  bindParam: false,
  /*logging: false,*/
  dialectOptions: {
    options: {
      connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server= (LocalDB)\\MSSQLLocalDB;Database=HMZ;Trusted_Connection=yes;',
    },
  },
  define:{
    timestamps: false,
  }
}
)

module.exports = sequelize