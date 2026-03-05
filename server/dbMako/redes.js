const pool = require('./connection.js');

let csmDB = {};


csmDB.tipoRedes = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM tipoSocialNetwork`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;