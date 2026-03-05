const pool = require('./connection.js');

let csmDB = {};




csmDB.nuevoEventoBitacora = (tipoAccion, flujo, etiqueta, hashSession, authenticated, usuario, dispositivo, navegador, plataforma, pais) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO bitacora ( tipoAccion, flujo, etiqueta, hashSession, authenticated, usuario, dispositivo, navegador, plataforma, pais) VALUES (?,?,?,?,?,?,?,?,?,?);`, [tipoAccion, flujo, etiqueta, hashSession, authenticated, usuario, dispositivo, navegador, plataforma, pais], (err, results) => {


            if (err) {
                return reject(err);
            } else {


                return resolve(results)
            }
        });

    })

};


csmDB.busquedasPalabra = () => {

    return new Promise((resolve, reject) => {

        pool.query(`select b.etiqueta, COUNT(*) as count
                    from bitacora as  b
                    WHERE b.tipoAccion = 1 AND b.flujo = 'Barra busqueda'
                    group by b.etiqueta
                    `, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.flujosNavegacion = () => {

    return new Promise((resolve, reject) => {

        pool.query(`select b.*
                    from bitacora as  b
                    ORDER BY b.fechaHora DESC
                    `, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;