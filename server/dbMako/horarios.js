const pool = require('./connection.js');

let csmDB = {};


csmDB.tipoHorarios = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM tipoHorario`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;