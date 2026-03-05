const pool = require('../connection.js');
var moment = require('moment');

let csmDB = {};


csmDB.addMunicipio = (id, nombre, codDep) => {

    return new Promise((resolve, reject)=> {

        pool.query(`INSERT INTO municipio (id, nombre, codDepartamento) VALUES (?,?,?)`, [ id, nombre, codDep], (err, results) => {

            if(err){
                return reject(err);
            }else{
                

                return resolve(results);
            }
        });

    })

};


csmDB.addDepartamento = (id, codigo, nombre) => {

    return new Promise((resolve, reject)=> {

        pool.query(`INSERT INTO departamento (id, codigo, nombre) VALUES (?,?,?)`, [ id, codigo, nombre], (err, results) => {

            if(err){
                return reject(err);
            }else{
                

                return resolve(results);
            }
        });

    })

};


module.exports = csmDB;