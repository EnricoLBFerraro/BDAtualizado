const Sequelize = require('sequelize')
const database = require('./back-sequelize')

const Publi = database.define('Publi', {
    Titulo: {
        type: Sequelize.STRING,
    },
    Texto: {
        type: Sequelize.STRING,
    },
    Escritor: {
        type: Sequelize.STRING,
    },
    Imagem : {
        type: Sequelize.STRING, //Duvida: como podemos armazenar uma imagem no bd?
    },
    Tipo_De_Publi :{
        type : Sequelize.STRING,
    },
    Data_da_Publi : {
        type: Sequelize.STRING,
    }
});

module.exports = Publi;