module.exports = {

	// DATABASES ADDRESSES
	prodDB: "mongodb://angeloacr:cisbankDataBase47@ds051595.mlab.com:51595/samaven",
	testDB: "mongodb://localhost:27017/samaven",

	// SECRETS FOR ENCRYPTION
	 	authSecret: 'Shall I let you pass, or Shall I not?',
		vSecret: 'Becoming an outstanding BookApp User',
		cSecret: 'My incredible BookApp Session',
		mSecret: 'My secret moves will never be discovered',
		appPort: 3200,
		host: 'localhost',
		mysqlPort: '3306',
		mysqlUser: 'bookappc_bookApp',
		mysqlPass: "&VQMhz5F^_{F",
		dbName: 'bookappc_bookApp',
		connectionLimit: 100
	 
/* 	authSecret: process.env.authSecret,
	vSecret: process.env.vSecret,
	cSecret: process.env.cSecret,
	mSecret: process.env.mSecret,
	appPort: process.env.appPort,
	host: process.env.host,
	mysqlPort: process.env.mysqlPort,
	mysqlUser: process.env.mysqlUser,
	mysqlPass: process.env.mysqlPass,
	dbName: process.env.dbName,
	connectionLimit: process.env.connectionLimit, */

}