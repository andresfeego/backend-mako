const pool = require('../connection.js');

let csmDB = {};


csmDB.cupones = (cupon) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM cuponMako WHERE cuponMako.cupon = ? `, [cupon], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};


module.exports = csmDB;