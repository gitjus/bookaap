const express = require('express');
const reservaRouter = express.Router();
const Appointment = require('../models/appointment')
const auth = require("../../users/auth/auth");

reservaRouter.get('/', auth, async (req, res) => {
	try {
		const usuario = req.user.usuario;
		const response = await Appointment.getAppointmentsByUser(usuario);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

reservaRouter.get('/all', auth, async (req, res) => {
	try {
		const response = await Appointment.getAppointments();
		/* if (response.values && response.values.length) {
			const msg = ` ${req.originalUrl} ${JSON.stringify(response)}`;
		} else {
			throw ('There are not appointments for this patient')
		} */
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


reservaRouter.post('/', auth, async (req, res) => {
	try {
		const usuario = req.user.usuario;
		const appointment = {
			cliente: usuario,
			fecha: req.body.fecha,
			info: req.body.info,
			hora: req.body.hora,
			servicio: req.body.servicio,
		};

		let newAppointment = await Appointment.addAppointment(appointment);
		
		res.status(200).json(newAppointment);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


reservaRouter.put('/', auth, async (req, res) => {
	try {
		const appointmentId = req.query.appointmentId;
		let response = await Appointment.updateAppointment(appointmentId);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



reservaRouter.delete('/', auth, async (req, res) => {
	try {
		const jsonItem = req.query.item; 
		let item = JSON.parse(jsonItem); 
		let response = await Appointment.deleteAppointment(item);
		res.status(200).json('response');
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



module.exports = reservaRouter;