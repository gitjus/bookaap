module.exports = {

    // DATABASES INFO
    host: 'localhost',
    mysqlPort: '3306',
    mysqlUser: 'root',
    mysqlPass: "",
    dbName: 'bookapp',
    connectionLimit: 100,

    // SECRETS FOR ENCRYPTION
    authSecret: 'Shall I let you pass, or Shall I not?',
    vSecret: 'Becoming an outstanding BookApp User',
    cSecret: 'My incredible BookApp Session',
    mSecret: 'My secret moves will never be discovered',

    /* 	authSecret: process.env.authSecret,
    	vSecret: process.env.vSecret,
    	cSecret: process.env.cSecret,
    	mSecret: process.env.mSecret,
    	host: process.env.host,
    	mysqlPort: process.env.mysqlPort,
    	mysqlUser: process.env.mysqlUser,
    	mysqlPass: process.env.mysqlPass,
    	dbName: process.env.dbName,
    	connectionLimit: process.env.connectionLimit, */
}