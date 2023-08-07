const Sequelize = require('sequelize')

const connection = new Sequelize('blog-db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
