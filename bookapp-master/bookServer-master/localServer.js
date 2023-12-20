const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const compression = require('compression');
const config = require('./config/environment');
const cookieSess = require('cookie-session');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const app = express();

const users = require('./users/routes/users');
const auth = require('./users/routes/auth');
const mails = require('./users/routes/mails');
const empresas = require('./empresas/routes/empresas');
const reservas = require('./reservas/routes/reservas');
const servicios = require('./servicios/routes/servicios');

module.exports.init = function (folder, port) {
	app.set('port', (port));

	// Middlewares initialization

	// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
	/* 
	var limiter = new RateLimit({
	  windowMs: 15*60*1000, // 15 minutes 
	  max: 50, // limit each IP to 50 requests per windowMs 
	  delayMs: 0 // disable delaying - full speed until the max limit is reached 
	});
	 
	//  apply to all requests 
	app.use(limiter);*/

	//App compression
	app.use(compression());

	// Cors Middleware
	app.use(cors());

	// Body Parser Middleware
	app.use(bodyParser.json());

	//Cookie session Middleware
	app.use(cookieSess({
		name: 'Bookapp Session',
		secret: config.cSecret,
		maxAge: 7 * 24 * 60 * 60 * 1000 //A week
	}));

	app.use(helmet());

	/*	// Passport Middleware
	app.use(passport.initialize());
	app.use(passport.session());
	require('./config/passport')(passport);
	*/
	// Set Static Folder

	app.use(express.static(path.join(__dirname, folder)));

	//Adding routes

	app.use('/users', users);
	app.use('/mails', mails);
	app.use('/auth', auth);
	app.use('/empresas', empresas);
	app.use('/reservas', reservas);
	app.use('/servicios', servicios);

	return app
}
