const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const db = require('../../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


module.exports.addEmpresa = async function(newEmpresa) {
    try {
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let queryData = ['empresas', 'NIT', newEmpresa.NIT];
        let results = await this.queryDb(query, queryData);
        if (results.length != 0) {
            throw new Error('Empresa already in use');
        } else {
            /* 			query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
            			queryData = ['empresas', 'NIT', 'nombre', 'dueño', 'horarios', 'telefono', newEmpresa.NIT, newEmpresa.nombre, newEmpresa.dueño, newEmpresa.horarios, newEmpresa.telefono];
             */
            query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
            queryData = ['empresas', 'NIT', 'nombre', 'dueño', 'telefono', newEmpresa.NIT, newEmpresa.nombre, newEmpresa.dueno, newEmpresa.telefono];

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
};

module.exports.setHorario = function(horarios) {

}

module.exports.deleteEmpresa = async function(NIT) {
    try {
        let query = 'DELETE FROM ?? WHERE ??=?';
        queryData = ['empresas', 'NIT', NIT];
        let results = await this.queryDb(query, queryData);
        if (!results) {
            throw new Error("Empresa doesn't exist")
        }
        let response = {
            status: true,
            values: results
        }
        return response;;
    } catch (error) {
        throw error;
    }
};
module.exports.updateEmpresa = async function(empresa) {
    try {
        let query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
        queryData = ['empresas', 'nombre', empresa.nombre, 'NIT', empresa.NITNew, 'dueño', empresa.dueno, 'horarios', empresa.horarios, 'telefono', empresa.telefono, 'NIT', empresa.NITNEW];
        query = this.formatQuery(query, queryData);
        let results = await this.queryDb(query);
        if (!results) {
            throw new Error("Username doesn't exist")
        }
        let response = {
            status: true,
            values: results
        }
        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.getEmpresa = async function(id) { //Need tons of work
    try {
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let queryData = ['empresas', 'id', id];
        let results = await this.queryDb(query, queryData);
        if (!results[0]) {
            throw new Error("Empresa doesn't exist")
        }
        let empresa = {
            //			id: results[0].id,
            nit: results[0].NIT,
            nombre: results[0].nombre,
            horarios: results[0].horarios,
            telefono: results[0].telefono
        };
        let fields = ['NIT', 'Nombre', 'Horarios', 'Telefono']
        let response = {
            status: true,
            values: empresa,
            fields: fields
        }
        return response;
        return empresa;
    } catch (error) {
        throw error;
    }
};

module.exports.getEmpresas = async function() { //Need tons of work
    try {
        let query = 'SELECT * FROM ??';
        let queryData = ['empresas'];
        let results = await this.queryDb(query, queryData);
        if (!results) {
            throw new Error("Empresa doesn't exist")
        }
        var eMap = [{}];
        var i = 0;
        results.forEach(function(result) {
            eMap[i] = {
                //				id: result.id,
                nit: result.NIT,
                nombre: result.nombre,
                horarios: result.horarios,
                telefono: result.telefono
            };
            i++;
        });
        let fields = ['NIT', 'Nombre', 'Horarios', 'Telefono']
        let response = {
            status: true,
            values: eMap,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.queryDb = async function(query, data) {
    try {
        let myDB = db.init();
        let formatedQuery = mysql.format(query, data);
        let results = await myDB.query(formatedQuery);

        return results;
    } catch (e) {
        throw e
    }
};

const Empresa = module.exports