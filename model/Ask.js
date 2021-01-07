const Sequelize = require('sequelize')
const connection = require('../database/database')

const Ask = connection.define('ask', {
    title:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Ask.sync({force: false}).then(() => {
    console.log("Creating table Ask")
})

module.exports = Ask