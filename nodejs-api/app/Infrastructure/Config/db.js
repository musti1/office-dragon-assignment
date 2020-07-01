require('dotenv').config();
const env = require('common-env')();

module.exports = {
    postgre_sql: {
        host: env.getOrElse('POSTGRE_SQL_HOST', 'localhost'),
        port: env.getOrElse('POSTGRE_SQL_PORT', 5432),
        user: env.getOrElse('POSTGRE_SQL_USER', 'postgres'),
        pass: env.getOrElse('POSTGRE_SQL_PASS', ''),
        db: env.getOrElse('POSTGRE_SQL_DB', 'user_product')
    }
};
