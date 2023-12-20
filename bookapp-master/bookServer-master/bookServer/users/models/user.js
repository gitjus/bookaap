const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const db = require('../../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports.comparePass = async function (candidatePassword, password) {
	try {
		return await bcrypt.compare(candidatePassword, password);
	} catch (error) {
		throw error;
	}
};
module.exports.hashPass = async function (password) {
	try {
		let salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt)
	} catch (error) {
		throw error;
	}
};
module.exports.genToken = function (username) {
	try {
		const hash = crypto.createHash('sha1');

		var hrTime = process.hrtime();
		var validTime = hrTime[0] * 1000000 + hrTime[1] / 1000

		var toHash = username + validTime.toString() + environment.vSecret;
		hash.update(toHash);
		return [hash.digest('hex'), validTime]
	} catch (error) {
		throw error;
	}
};

module.exports.addUser = async function (newUser) {
	try {
		let query = 'SELECT * FROM ?? WHERE ?? = ?';
		let queryData = ['users', 'email', newUser.email];
		query = this.formatQuery(query, queryData);
		let results = await this.queryDb(query);
		if (results) {
			throw new Error('Email already in use');
		} else {
			query = 'SELECT * FROM ?? WHERE ?? = ?';
			queryData = ['users', 'username', newUser.username];
			query = this.formatQuery(query, queryData);
			user = await this.queryDb(query);
			if (results) {
				throw new Error('Username already in use');
			} else {
				newUser.password = await newUser.hashPass(newUser.password);
				query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?, ?)';
				queryData = ['users', 'username', 'password', 'tipo', newUser.username, newUser.password, newUser.email, newUser.tipo];
				query = this.formatQuery(query, queryData);
				results = await this.queryDb(query);
				return results;
			}
		}
	} catch (error) {
		throw error;
	}
};
module.exports.authUser = async function (username, password) {
	try {
		let query = 'SELECT * FROM ?? WHERE ?? = ?';
		let queryData = ['users', 'username', username];
		query = this.formatQuery(query, queryData);
		let results = await this.queryDb(query);
		let user = {
			id: results[0].id,
			username: results[0].username,
			tipo: results[0].tipo
		}
		if (!user) {
			throw new Error("Username doesn't exist")
		}
		let isMatch = await this.comparePass(password, results[0].password)
		let data = {}
		if (isMatch) {

			const token = jwt.sign(user, environment.authSecret, {
				expiresIn: '7d' //1 day
			});
			jwtData = {
				auth: true,
				token: token
			}
		} else {
			jwtData = {
				auth: false
			}
		}
		return jwtData;
	} catch (error) {
		throw error;
	}
};
module.exports.deleteUser = async function (id) {
	try {
		let query = 'DELETE FROM ?? WHERE ?? = ?';
		queryData = ['users', 'id', id];
		query = this.formatQuery(query, queryData);
		let results //= await this.queryDb(query);
		if (!results) {
			throw new Error("Username doesn't exist")
		}
		return true;
	} catch (error) {
		throw error;
	}
};
module.exports.updateUser = async function (data) {
	try {
		const query = { '_id': data.id }
		let user = await this.findOne(query);
		user.name = data.name;
		user.avatarSrc = data.avatarSrc;
		user.phone = data.phone;
		return await user.save();
	} catch (error) {
		throw error;
	}
};
module.exports.getUser = async function (id) { //Need tons of work
	try {
		let query = 'SELECT * FROM ?? WHERE ?? = ?';
		let queryData = ['users', 'id', id];
		query = this.formatQuery(query, queryData);
		let results = await this.queryDb(query);
		if (!results[0]) {
			throw new Error("Username doesn't exist")
		}
		let user = {
			id: results[0].id,
			username: results[0].username,
			tipo: results[0].tipo
		}
		return user;
	} catch (error) {
		throw error;
	}
};
module.exports.getUsersByType = async function (type) { //Need tons of work
	try {
		let query;
		let queryData;
		if (type == 'all') {
			query = 'SELECT * FROM ??';
			queryData = ['users'];
		} else {
			query = 'SELECT * FROM ?? WHERE ?? = ?';
			queryData = ['users', 'tipo', type];
		}
		query = this.formatQuery(query, queryData);
		let results = await this.queryDb(query);
		if (!results) {
			throw new Error("There are no users of this type")
		}
		var uMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			uMap[i] = {
				id: result.id,
				username: result.username,
				tipo: result.tipo
			};
			i++;
		});
		let response = {
			values: uMap
		}
		return response;
	} catch (error) {
		throw error;
	}
};
module.exports.getUsers = async function () { //Need tons of work
	try {
		let query = 'SELECT * FROM ??';
		let queryData = ['users'];
		query = this.formatQuery(query, queryData);
		let results = await this.queryDb(query);
		if (!results) {
			throw new Error("Username doesn't exist")
		}
		var uMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			uMap[i] = {
				id: result.id,
				username: result.username,
				tipo: result.tipo
			};
			i++;
		});
		let response = {
			values: uMap
		}
		return response;
	} catch (error) {
		throw error;
	}
};
module.exports.setToken = async function setToken(username) {
	try {
		let tokenData = this.genToken(username);
		const query = { username: username };
		return await this.findOneAndUpdate(
			query, {
				$set: {
					"validEmail": false,
					"validToken": tokenData[0],
					"validTime": tokenData[1]
				}
			},
			updateOptions
		);
	} catch (error) {
		throw error;
	}
};
module.exports.validateUser = async function (username, token) {
	try {
		const hrTime = process.hrtime();
		const thisTime = hrTime[0] * 1000000 + hrTime[1] / 1000
		const maxTime = 3600 * 8 * 1000000;
		const query = { "username": username };

		let user = await this.findOne(query);

		if (thisTime - user.validTime < maxTime) {
			if (user.validToken == token) {
				user = await this.findOneAndUpdate(
					query, {
						$set: {
							"validEmail": true,
						}
					},
					updateOptions
				);
				return user;
			} else {
				throw new Error('Wrong token');
			}
		} else {
			throw new Error('Token has expired');
		}

	} catch (error) {
		throw error;
	}
};

module.exports.formatQuery = function (query, data) {
	try {

		let formatedQuery = mysql.format(query, data);
		return formatedQuery;
	} catch (e) {
		throw e
	}
};

module.exports.queryDb = async function (query) {
	try {
		let myDB = db.init();
		let results = await myDB.query(query);

		return results;
	} catch (e) {
		throw e
	}
};

const User = module.exports
