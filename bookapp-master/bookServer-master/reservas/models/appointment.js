const environment = require('../../config/environment');
const db = require('../../database');
const mysql = require('mysql');

module.exports.isAvailable = async function (doctorId, patientId, initDate) {
  try {
    const queryA = {
      'doctorId': doctorId,
      'initDate': initDate,
    };
    let appointment = await this.findOne(queryA);
    if (!appointment) {
      const queryB = {
        'patientId': patientId,
        'initDate': initDate,
      };
      appointment = await this.findOne(queryB);
      if (!appointment) {
        return true;
      } else {
        throw new Error('Patient is not available');
      }
    } else {
      throw new Error('Doctor is not available')
    }
  } catch (error) { throw error }
}
module.exports.getLength = async function (date1, date2) {
  try {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60));
    return diffDays;
  } catch (e) {
    throw e;
  }
}

module.exports.addAppointment = async function (newAppointment) {
  try {
		let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?';
    let queryData = ['reservas', 'servicio', newAppointment.servicio, 'fecha', newAppointment.fecha, 'horaInicio', newAppointment.hora];
//    let queryData = ['reservas', 'fecha', newAppointment.fecha, 'horaInicio', newAppointment.hora];
		let results = await this.queryDb(query, queryData);
		if (results.length != 0) {
			throw new Error('Reserva no disponible');
		} else {
			query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
			queryData = ['reservas', 'servicio', 'fecha', 'horaInicio', 'cliente', 'info', newAppointment.servicio, newAppointment.fecha, newAppointment.hora, newAppointment.cliente, newAppointment.info];
			results = await this.queryDb(query, queryData);

			let response = {
				status: true,
				values: results
			}
			return response;
		}
  } catch (error) {
    throw error;
  }
}
module.exports.fillChilds = async function (aId) {
  const query = { '_id': aId }
  let appointment = await this.findOne(query).populate('patientId').populate('doctorId');
  appointment.patientId['appointmenstId'].push(appointment._id);
  appointment.doctorId['appointmenstId'].push(appointment._id);
  let patient = appointment.patientId.save();
  let doctor = appointment.doctorId.save();
  return appointment;
}
module.exports.getAppointmentsByDoctor = async function (doctorId) {
  try {
    const query = { 'doctorId': doctorId };
    let appointments = await this.find(query);
    var rMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			rMap[i] = {
//				id: result.id,
				servicio: result.servicio,
				cliente: result.cliente,
				info: result.info,
				inicio: result.horaInicio,
        fecha: result.fecha
			};
			i++;
		});
    let fields = ['Servicio', 'Cliente', 'Info', 'Fecha', 'Inicio']
		let response = {
			status: true,
			values: rMap,
      fields: fields
		};
    return response;
  } catch (e) {
    throw e;
  }
}
module.exports.getAppointmentsByPatient = async function (patientId) {
  try {
    const query = { 'patientId': patientId };
    let appointments = await this.find(query);
    var rMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			rMap[i] = {
//				id: result.id,
				servicio: result.servicio,
				cliente: result.cliente,
				info: result.info,
				inicio: result.horaInicio,
        fecha: result.fecha
			};
			i++;
		});
    let fields = ['Servicio', 'Cliente', 'Info', 'Fecha', 'Inicio']
		let response = {
			status: true,
			values: rMap,
      fields: fields
		};
    return response;
    } catch (e) {
    throw e;
  }
}

module.exports.getAppointments = async function (patientId) {
	try {
		let query = 'SELECT * FROM ??';
		let queryData = ['reservas'];
		let results = await this.queryDb(query, queryData);
		if (!results) {
			throw new Error("There are no appointments yet")
		}
    var rMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			rMap[i] = {
//				id: result.id,
				servicio: result.servicio,
				cliente: result.cliente,
				info: result.info,
				inicio: result.horaInicio,
        fecha: result.fecha
			};
			i++;
		});
    let fields = ['Servicio', 'Cliente', 'Info', 'Fecha', 'Inicio']
		let response = {
			status: true,
			values: rMap,
      fields: fields
		};
		return response;
	} catch (error) {
		throw error;
	}
}

module.exports.getAppointmentsByUser = async function (usuario) {
	try {
		let query = 'SELECT * FROM ?? WHERE ?? = ?';
		let queryData = ['reservas', 'cliente', usuario];
		let results = await this.queryDb(query, queryData);
    let response = {};
 		if (!results) {
			throw new Error("There are no appointments yet")
		} 
    if(results && results.length){

    var rMap = [{}];
		var i = 0;
		results.forEach(function (result) {
			rMap[i] = {
//				id: result.id,
				servicio: result.servicio,
				cliente: result.cliente,
				info: result.info,
				inicio: result.horaInicio,
        fecha: result.fecha
			};
			i++;
		});
    let fields = ['Servicio', 'Cliente', 'Info', 'Fecha', 'Inicio']
		response = {
			status: true,
			values: rMap,
      fields: fields
		};
    } else{
		response = {
			status: false,
			msg: 'There are no appointments yet'
		};
    }
		return response;
	} catch (error) {
		throw error;
	}
}


module.exports.deleteAppointment = async function (item) {
  try {
		let query = 'DELETE FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?';
		queryData = ['reservas', 'servicio', item.servicio, 'fecha', item.fecha, 'horaInicio', item.inicio];
		let results = await this.queryDb(query, queryData);
		if (!results) {
			throw new Error("Reserva doesn't exist")
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