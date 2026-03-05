const pool = require('./connection.js');

let csmDB = {};






csmDB.verificarCodigo = (codigo) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.nombre
                    from empresa as  e
                    WHERE e.codigo = ?
                    `, [codigo], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};



csmDB.categoriasConEmpresas = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT DISTINCT cat.nombre, sub1.nombre  AS nombreSub1, sub2.nombre  AS nombreSub2, sub2.palabras_clave  AS palabrasClave , catt.categoria  AS id, MAX(em.fechaLastMod) AS fechaLastMod
        FROM categorias AS cat

        JOIN subcategoria1 AS sub1
        ON sub1.id_categoria = cat.idcategorias

        JOIN subcategoria2 AS sub2
        ON sub2.idsubcategoria1 = sub1.idsubcategoria1
        
        JOIN categoria AS catt
        ON catt.categoria = sub2.idsubcategoria2

        JOIN empresa_has_categoria AS ehc
        ON ehc.idCat = catt.idCat

        JOIN empresa AS em
        ON ehc.id_empresa = em.codigo

             WHERE em.activo = 1 AND em.oculto = 0
             
             GROUP BY 
             cat.nombre,
             sub1.nombre,
             sub2.nombre,
             catt.categoria
             
            ORDER BY catt.categoria ASC`, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.ciudadesConEmpresas = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT DISTINCT mun.*, dep.nombre as nombreDep, MAX(em.fechaLastMod) AS fechaLastMod
        FROM municipio as mun

        JOIN departamento as dep
        ON dep.codigo = mun.codDepartamento 

        JOIN empresa as em
        ON em.id_municipio = mun.id 
   
        WHERE em.activo = 1 AND em.oculto = 0

        GROUP BY 
        mun.id,
        dep.nombre

        ORDER BY mun.nombre ASC`, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.ciuycatConEmpresas = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT DISTINCT cat.nombre, sub1.nombre  AS nombreSub1, sub2.nombre  AS nombreSub2, sub2.palabras_clave  AS palabrasClave , mun.nombre, catt.categoria  AS id, MAX(em.fechaLastMod) AS fechaLastMod
        FROM categorias AS cat

        JOIN subcategoria1 AS sub1
        ON sub1.id_categoria = cat.idcategorias

        JOIN subcategoria2 AS sub2
        ON sub2.idsubcategoria1 = sub1.idsubcategoria1
        
        JOIN categoria AS catt
        ON catt.categoria = sub2.idsubcategoria2

        JOIN empresa_has_categoria AS ehc
        ON ehc.idCat = catt.idCat

        JOIN empresa AS em
        ON ehc.id_empresa = em.codigo

        JOIN municipio AS mun
        ON em.id_municipio = mun.id
             WHERE em.activo = 1 AND em.oculto = 0

             GROUP BY 
            cat.nombre,
            sub1.nombre,
            sub2.nombre,
            mun.nombre,
            catt.categoria
            ORDER BY catt.categoria ASC`, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};




csmDB.domiciliariosXciudad = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.*, mu.nombre AS nombreMun , de.nombre AS nombreDep
                            from empresa as  e

                            join barrios as ba
                            on e.barrio = ba.idBarrio

                            join municipio as mu
                            on e.id_municipio = mu.id

                            JOIN empresa_has_categoria AS ehc
                            ON ehc.id_empresa = e.codigo

                            JOIN categoria AS ca
                            ON ca.idCat = ehc.idCat
                            
                            join departamento as de
                            on mu.codDepartamento = de.codigo

                        WHERE mu.id = ? AND ( ca.categoria = 19 OR ca.categoria = 20 OR ca.categoria = 302 )`, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};




module.exports = csmDB;