const Sequelize = require('sequelize');
const PostGreSQLConn = require('../DbConnections/postgreSql');

const companyModel = PostGreSQLConn.define('Company', {
    companyId: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {type: Sequelize.STRING},
    description: {type: Sequelize.STRING},
    tags: {type: Sequelize.ARRAY(Sequelize.STRING)},
    userId: {type: Sequelize.STRING},
    createdAt: {type: Sequelize.DATE, allowNull: true},
    updatedAt: {type: Sequelize.DATE, allowNull: true},

});

module.exports = companyModel;
