const Sequelize = require('sequelize')

const sequelize1 = new Sequelize('NomeDoBD', 'user', 'senha', {
    host: 'localhost',//normalmente, em maquinas locais, é utilizado o localhost
    dialect: 'mysql',//Linguagem utilizada
});

module.exports = sequelize1;
