const express = require('express');
const servicioRouter = express.Router();
const Servicio = require('../models/servicio')
const auth = require("../../users/auth/auth");

servicioRouter.get('/', auth, async (req, res) => {
	try {
		const usuario = req.user.usuario;
		const response = await Servicio.getServiciosByUser(usuario);
		if (response.values && response.values.length) {
			const msg = ` ${req.originalUrl} ${JSON.stringify(response)}`;
		} else {
			throw ('There are not servicios for this patient')
		}
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

servicioRouter.get('/all', auth, async (req, res) => {
	try {
		const response = await Servicio.getServicios();
/* 		if (response.values && response.values.length) {
			const msg = ` ${req.originalUrl} ${JSON.stringify(response)}`;
		} else {
			throw ('There are not servicios for this patient')
		} */
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


servicioRouter.post('/', auth, async (req, res) => {
	try {
	  
		const servicio = {
			encargado: req.body.encargado,
			tipo: req.body.tipo,
			descripcion: req.body.descripcion,
			costo: req.body.costo,
			empresa: req.body.empresa,
		};

		let newServicio = await Servicio.addServicio(servicio);
		
		res.status(200).json(newServicio);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


servicioRouter.put('/', auth, async (req, res) => {
	try {
		const ref = req.query.ref;
		let response = await Servicio.updateServicio(ref);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



servicioRouter.delete('/', auth, async (req, res) => {
	try {
		const jsonItem = req.query.item; 
		let item = JSON.parse(jsonItem); 
		let response = await Servicio.deleteServicio(item.ref);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



module.exports = servicioRouter;