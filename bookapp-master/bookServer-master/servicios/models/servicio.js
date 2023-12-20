const environment = require('../../config/environment');
const db = require('../../database');
const mysql = require('mysql');

module.exports.createRef = async function (newServicio) {
  try {
      let query = 'SELECT count(*) as total FROM ??';
      let queryData = ['servicios'];
			let results = await this.queryDb(query, queryData);
			let total = results[0].total;
      let ref = total + '/' + newServicio.encargado + '/' + newServicio.empresa;
      return ref;
		} catch (error) {
    throw error;
  }
}

module.exports.addServicio = async function (newServicio) {
  try {
      let ref = await this.createRef(newServicio);
			let query = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
			let queryData = ['servicios', 'tipo', 'descripcion', 'costo', 'encargado', 'empresa', 'ref', newServicio.tipo, newServicio.descripcion, newServicio.costo, newServicio.encargado, newServicio.empresa, ref];
			let results = await this.queryDb(query, queryData);
			let response = {
				status: true,
				values: results
			}
			return response;
		} catch (error) {
    throw error;
  }
}

module.exports.getServicioByUser = async function (usuario) {
	try {
		let query = 'SELECT * FROM ?? WHERE ?? = ?';
		let queryData = ['servicios', 'encargado', usuario];
		let results = await this.queryDb(query, queryData);
		if (!results) {
			throw new Error("There are no appointments yet")
		}
    var sMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			sMap[i] = {
//				id: result.id,
				tipo: result.tipo,
				descripcion: result.descripcion,
				costo: result.costo,
				empresa: result.empresa,
        encargado: result.encargado,
        ref: result.ref
			};
			i++;
		});
    let fields = ['Tipo', 'Descripcion', 'Costo', 'Empresa', 'Encargado', 'Ref']
		let response = {
			status: true,
			values: sMap,
      fields: fields
		};
		return response;
	} catch (error) {
		throw error;
	}
}

module.exports.getServicios = async function () {
	try { 
		let query = 'SELECT * FROM ??';
		let queryData = ['servicios'];
		let results = await this.queryDb(query, queryData);
		if (!results) {
			throw new Error("There are no appointments yet")
		}
    var sMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			sMap[i] = {
//				id: result.id,
				tipo: result.tipo,
				descripcion: result.descripcion,
				costo: result.costo,
				empresa: result.empresa,
        encargado: result.encargado,
        ref: result.ref
			};
			i++;
		});
    let fields = ['Tipo', 'Descripcion', 'Costo', 'Empresa', 'Encargado', 'Ref']
		let response = {
			status: true,
			values: sMap,
      fields: fields
		};
		return response;
	} catch (error) {
		throw error;
	}
}

module.exports.deleteServicio = async function (item) {
  try {
		let query = 'DELETE FROM ?? WHERE ??=?';
		queryData = ['servicios', 'ref', item];
		let results = await this.queryDb(query, queryData);
		if (!results) {
			throw new Error("Servicio doesn't exist")
		}
		let response = {
			status: true,
			values: results
		}
		return response;;
	} catch (error) {
		throw error;
	}
}


module.exports.queryDb = async function (query, data) {
	try {
		let myDB = db.init();
		let formatedQuery = mysql.format(query, data);
		let results = await myDB.query(formatedQuery);

		return results;
	} catch (e) {
		throw e
	}
};