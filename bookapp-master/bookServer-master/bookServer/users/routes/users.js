const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const auth = require("../auth/auth");
const async = require('async');
const User = require('../models/user');

//**************************** USER CRUD************************************//
userRouter.post('/', async (req, res) => {
	try {
  
	  const user = {
		username: req.body.username,
		email: req.body.mail,
		password: req.body.password,
		tipo: req.body.tipo,
	  };
  
	  	let newUser = await User.addUser(user);  
	  res.status(200).json(newUser);
	}
	catch (e) { 
		res.status(400).json(e.toString());
	}
});
  

// Delete user
userRouter.delete('/', auth, async (req, res, next) => {
		try {
  
	  	const id = req.params.id;
  
	  	let response = await User.deleteUser(id);  
	  	res.status(200).json(response);
	}
	catch (e) { 
		res.status(400).json(e.toString());
	}
});

// Update user, NEED TO IMPROVE
userRouter.put('/', auth, passport.authenticate('jwt', {session:false}), async (req, res, next) => {
	const user = req.user;
	const updateData = req.body.updateData;

	let dataToUpdate = new User({
		username: user.username,
		fName: updateData.fName,
		lName: updateData.lName,		
		email: updateData.email
	});

	var gUser = function(callback){
		getUser(user.username, (err, uUser) => {
			if(err) callback(err);
			if(uUser){					
				callback(null, uUser);
			} else {
				callback(new Error('Username not found'))
			}
		});
	}

	var uUser = function(user, callback){
		User.updateUser(dataToUpdate, (err, uUser) =>{
			if(err) callback(err);
			if(uUser){
				callback(null, user);			
			}	
		});
	}		

	async.waterfall([
    	gUser,
    	uUser
	], function (err, result) {
		if (err) {
			return res.json({
					success: false, 				
					msg: err.message			
				});
		}
		return res.json({
			success: true, 				
			msg: result			
		});    	
    });
});

// Get User
userRouter.get('/', auth, async (req, res, next) => {
	return res.json({
		user: req.user
	});
});

userRouter.get('/:tipo', auth, async (req, res, next) => {
	try {
  
	  	const tipo = req.params.tipo;
  
	  	let response = await User.getUsersByType(tipo);  
	  	res.status(200).json(response);
	}
	catch (e) { 
		res.status(400).json(e.toString());
	}
	
});


/* userRouter.get('/all', auth, async (req, res, next) => {
	try {
		console.log('Here')
	  	const tipo = req.body.tipo;
  
	  	let response = await User.getUsers(tipo);  
	  	res.status(200).json(response);
	}
	catch (e) { 
		res.status(400).json(e.toString());
	}

}); */


//*****************ROUTES TO DB MIDDLEWARE*********************//

function getUser (username, callback) {
	User.getUserByUsername(username, (err, user) => {
		if(err) callback(err);
		if(user){
			callback(null, user) ;
		} else {
			callback(null, false) ;
		}
	});
}

function getMail(email, callback) {
	User.getUserByEmail(email, (err, user) => {
		if(err) callback(err);
		if(user){
			callback(null, user);
		} else{

			callback(null, false);			}
	});
}

function addUser (newUser, callback) {
	User.addUser(newUser, (err, user) => {
		if(err){
			callback(new Error('Failed to create user'))
		} else {
			callback(null, user);	
		}	
	});
}

module.exports = userRouter;