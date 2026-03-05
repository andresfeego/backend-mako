const pool = require('./connection.js');

let csmDB = {};



csmDB.categoriasCompletas = (busqueda) => {

    busqueda = "%"+busqueda+"%"

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT cat.*, sub1.nombre  AS nombreSub1, sub2.nombre  AS nombreSub2 , sub2.idsubcategoria2  AS id 
                    FROM categorias AS cat

                    JOIN subcategoria1 AS sub1
                    ON sub1.id_categoria = cat.idcategorias

                    JOIN subcategoria2 AS sub2
                    ON sub2.idsubcategoria1 = sub1.idsubcategoria1

                    WHERE sub2.nombre like ?
                        OR sub1.nombre like ?
                        OR cat.nombre like ?
                    
                    
                        ORDER BY cat.idcategorias ASC`, [busqueda, busqueda, busqueda], (err, results) => {

            if(err){
                return reject(err);
            }else{
                console.log(results.length)
                return resolve(results);
            }
        });

    })

};

csmDB.categorias = () => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM categorias ORDER BY categorias.idcategorias ASC`, (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.subCat1 = (id) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM subcategoria1 WHERE subcategoria1.id_categoria = ? ORDER BY subcategoria1.idsubcategoria1 ASC`, [id], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};


csmDB.subCat2 = (id) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM subcategoria2 WHERE subcategoria2.idsubcategoria1 = ? ORDER BY subcategoria2.idsubcategoria2 ASC`, [id], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};

csmDB.subCat2Xid = (id) => {

    return new Promise((resolve, reject)=> {

        pool.query(`SELECT * FROM subcategoria2 WHERE subcategoria2.idsubcategoria2 = ? ORDER BY subcategoria2.idsubcategoria2 ASC`, [id], (err, results) => {

            if(err){
                return reject(err);
            }else{

                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;