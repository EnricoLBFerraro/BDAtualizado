const Sequelize = require('sequelize')
const database = require('./back-sequelize')

const Login = database.define('Login', {
    Nome: {
        type: Sequelize.STRING,
    },
    Senha: {
        type: Sequelize.STRING,
    },
    Tipo_De_Login: {
        type: Sequelize.STRING,
    }
})

module.exports = Login;