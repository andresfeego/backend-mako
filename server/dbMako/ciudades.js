const pool = require('./connection.js');

let csmDB = {};

csmDB.barrioCiudadXid = (id) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT  b.nombreBarrio, c.*, e.direccion, e.ubicacion_maps, e.lat, e.lng

                            FROM empresa AS e

                            JOIN barrios AS b 

                                ON e.barrio = b.idBarrio

                                JOIN ciudades as c
                                ON c.id_ciudad = b.id_municipio

                            WHERE e.codigo = ? `,[id], (err, results) => {

            if(err){
                console.log(err)
                return reject(err);
            }else{
                return resolve(results);
            }
        });

    })

};

csmDB.ciudades = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM ciudades`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.departamentos = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM departamento ORDER BY departamento.nombre ASC`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.municipios = (codDep) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT mun.*, dep.nombre as nombreDep FROM municipio as mun

                    JOIN departamento as dep
                    ON dep.codigo = mun.codDepartamento 

                    WHERE mun.codDepartamento = ? 
                    ORDER BY mun.nombre ASC`, [codDep], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.listaMunicipios = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT mun.*, dep.nombre as nombreDep FROM municipio as mun

        JOIN departamento as dep
        ON dep.codigo = mun.codDepartamento 
        
        ORDER BY mun.nombre ASC`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};


csmDB.barrios = (idMunicipio) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM barrios WHERE barrios.id_municipio = ? ORDER BY barrios.nombreBarrio ASC`, [idMunicipio], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.departamentosMunicipios = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT de.id AS idDepartamento, de.nombre AS nombreDepartamento, mu.* 
                        FROM departamento AS de

                        JOIN municipio AS mu
                        ON de.id = mu.codDepartamento
                        
                        `, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;