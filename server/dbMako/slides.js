const pool = require('./connection.js');

let csmDB = {};

csmDB.slidesIntro = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT s.*, ca.nombre AS lblCat

                        FROM headerSlide AS  s
                        JOIN subcategoria2 AS ca

                        ON s.idCat = ca.idsubcategoria2

                        ORDER BY orden ASC`, (err, results) => {

            if(err){
                return reject(err);
            }else{
                

                return resolve(results);
            }
        });

    })

};

module.exports = csmDB;