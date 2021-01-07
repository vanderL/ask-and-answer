const Sequelize = require('sequelize')

const connection = new Sequelize('pontuacao', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection