const Sequelize = require('sequelize')
const database = require('./back-sequelize')


const Colab = database.define('Colaboradores', {
    Nome: {
        type: Sequelize.STRING,
    },
    Categoria: {
        type: Sequelize.STRING,
    },
    Data: {
        type: Sequelize.STRING,
    },
    Descricao : {
        type: Sequelize.STRING //Duvida: como podemos armazenar uma imagem no bd?
    }
})

module.exports = Colab;