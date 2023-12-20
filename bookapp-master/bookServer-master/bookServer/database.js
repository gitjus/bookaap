const mysql = require('mysql');
const config = require('./config/environment');
var util = require('util');

//Database stuff
module.exports.init = function () {
    // Connect to Database
    const host = config.host;
    const mysqlPort = config.mysqlPort;
    const mysqlUser = config.mysqlUser;
    const mysqlPass = config.mysqlPass;
    const dbName = config.dbName;
    const connectionLimit = config.connectionLimit;
    var pool = mysql.createPool({
        host: host,
        connectionLimit: connectionLimit,
        port: mysqlPort,
        user: mysqlUser,
        password: mysqlPass,
        database: dbName
    });
    pool.query = util.promisify(pool.query)
    return pool;
};