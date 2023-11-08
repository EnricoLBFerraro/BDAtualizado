const Sequelize = require('sequelize')
const database = require('./back-sequelize')


const User = database.define('User', {
    Nome: {
        type: Sequelize.STRING,
    },
    Email: {
        type: Sequelize.STRING,
    },
    Drt: {
        type: Sequelize.STRING,
    },
    Cargo : {
        type: Sequelize.STRING, //Duvida: como podemos armazenar uma imagem no bd?
    },
    Senha : {
        type : Sequelize.STRING,
    }
});

module.exports = User;