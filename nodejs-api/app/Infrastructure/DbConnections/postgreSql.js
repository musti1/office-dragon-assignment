const Sequelize = require('sequelize');
const {host, port, pass, user, db} = require('../Config/db').postgre_sql;
const connectionString = `postgres://${user}:${pass}@${host}:${port}/${db}`;

const PostGreSQLConn = new Sequelize(connectionString);

PostGreSQLConn
    .authenticate()
    .then(() => {
        console.log('Postgres Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


PostGreSQLConn.sync().then((result) => {
    console.log("Database has synced successfully!");
}).catch((err) => {
    console.log("Database sync Error: ", err);
});


module.exports = PostGreSQLConn;
