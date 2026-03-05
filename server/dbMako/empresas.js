const pool = require('./connection.js');

let csmDB = {};


csmDB.empresas = (ciudad, busServicios, busCategoria, limiteInf, limiteSup) => {

    const data = [];

    let consulta = `select e.*, mu.nombre AS nombreMun , de.nombre AS nombreDep
                            from empresa as  e

                            join barrios as ba
                            on e.barrio = ba.idBarrio

                            join municipio as mu
                            on e.id_municipio = mu.id
                            
                            join departamento as de
                            on mu.codDepartamento = de.codigo

                            join empresa_has_categoria as hc
                            on e.codigo = hc.id_empresa

                            join categoria as ca
                            on hc.idCat = ca.idCat

                            join subcategoria2 as sub2
                            on sub2.idsubcategoria2 = ca.categoria

                            join subcategoria1 as sub1
                            on sub1.idsubcategoria1 = sub2.idsubcategoria1

                            join categorias as cas
                            on sub1.id_categoria = cas.idcategorias

                            where e.oculto = 0
                            
                            
                        `;
    let where = "";

    if (ciudad != '') {

        ciudad = "%" + ciudad + "%";
        where += ` and mu.nombre like ? and e.oculto = 0`;
        data.push(ciudad);

    }

    if (busServicios != '') {

        busServicios = "%" + busServicios + "%";

        where += ` AND (e.descripcion like ? or e.palabras_clave like ? or e.nombre like ?) `;
        data.push(busServicios);
        data.push(busServicios);
        data.push(busServicios);

    }

    if (busCategoria != 0) {


        where += ` and ca.categoria like ? `;
        data.push(busCategoria);

    }


    consulta += where + ` order by e.fechaRegistro desc LIMIT ?,?`;
    data.push(limiteInf);
    data.push(limiteSup);



    return new Promise((resolve, reject) => {

        pool.query(consulta, data, (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });

    })

};

// Devuelve empresas cuyo teléfono coincida con al menos uno del array
csmDB.buscarPorTelefonos = (telefonos = []) => {
  if (!telefonos.length) return Promise.resolve([]);

  const placeholders = telefonos.map(() => '?').join(',');
  const sql = `
    SELECT e.codigo, e.nombre, e.descripcion, e.slogan
      FROM empresa               e
      JOIN empresa_has_telefonos h ON e.codigo = h.empresa_codigo
      JOIN telefonos             t ON h.telefonos_id_telefono = t.id_telefono
     WHERE t.telefono IN (${placeholders})
       AND e.oculto = 0
  `;

  return new Promise((resolve, reject) => {
    pool.query(sql, telefonos, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};



csmDB.empresaXcodigo = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.*, mu.nombre AS nombreMun , de.nombre AS nombreDep
        from empresa as  e

        join barrios as ba
        on e.barrio = ba.idBarrio

        join municipio as mu
        on e.id_municipio = mu.id
        
        join departamento as de
        on mu.codDepartamento = de.codigo

        join empresa_has_categoria as hc
        on e.codigo = hc.id_empresa

        join categoria as ca
        on hc.idCat = ca.idCat

        join subcategoria2 as sub2
        on sub2.idsubcategoria2 = ca.categoria

        join subcategoria1 as sub1
        on sub1.idsubcategoria1 = sub2.idsubcategoria1

        join categorias as cas
        on sub1.id_categoria = cas.idcategorias

                        WHERE e.codigo = ?`, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.tipoEmpresa = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.tipo

                        from empresa as e
                    
                        where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.imagenesSlide = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo , i.*

                        from empresa as e

                        join empresa_has_imagen as h 
                        on e.codigo = h.id_empresa
                        
                        join imagen as i
                        on h.id_imagen = i.id
                        
                        where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};


csmDB.categoria = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo, ca.categoria , subCat2.nombre

                            from empresa as e 
                            
                            join empresa_has_categoria as hc 
                            on e.codigo = hc.id_empresa 
                            
                            join categoria as ca 
                            on hc.idCat = ca.idCat 
                            
                            join subcategoria2 as subCat2
                            on ca.categoria = subCat2.idsubcategoria2

                            where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.telefonos = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo , t.*, d.indicativo
                        from empresa as e

                        join empresa_has_telefonos as h 
                        on e.codigo = h.empresa_codigo

                        
                        join municipio as m 
                        on e.id_municipio = m.id
                        
                        join departamento as d 
                        on m.codDepartamento = d.codigo

                        join telefonos as t
                        on h.telefonos_id_telefono = t.id_telefono

                        where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.emails = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo , em.*
                        from empresa as e

                        join empresa_has_correo as hc 
                        on e.codigo = hc.empresa_codigo

                        join correo as em
                        on hc.correo_idcorreo = em.idcorreo

                        where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.redes = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo , e.nombre, sn.*, ts.descripcion as descSocial, ts.pagina as paginaSocial, ts.urlicono
                            from empresa as e

                            join empresa_has_socialNet as hs 
                            on e.codigo = hs.empresa_codigo

                            join socialNetwork as sn
                            on hs.idSocial = sn.id

                            join tipoSocialNetwork as ts
                            on sn.tipoSocial = ts.id

                            where e.codigo = ? `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};



csmDB.horarios = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.codigo , ho.*, th.descripcion as descHorario, th.id, tjor.descripcion as descJornada, jor.de, jor.a
                        from empresa as e

                        join empresa_has_horario as hh 
                        on e.codigo = hh.empresa_codigo

                        join horario as ho
                        on hh.horario_idhorario = ho.idhorario

                        join tipoHorario as th
                        on ho.tipoHorario = th.id

                        join horario_has_jornadas as hhj
                        on hhj.horario_idhorario = ho.idhorario

                        join jornadas as jor
                        on jor.idjornadas = hhj.jornadas_idjornadas

                        join tipoJornada as tjor
                        on tjor.id = jor.tipojornada

                        where e.codigo = ? ORDER BY tjor.id ASC `, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};


csmDB.jornadas = (id) => {

    return new Promise((resolve, reject) => {

        pool.query(`select jo.*, tj.descripcion as descJornada
                            from horario as ho

                            join horario_has_jornadas as hj 
                            on hj.horario_idhorario = ho.idhorario

                            join jornadas as jo
                            on jo.idjornadas = hj.jornadas_idjornadas

                            join tipoJornada as tj
                            on jo.tipojornada = tj.id 
                            

                            where ho.idhorario = ?`, [id], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};



module.exports = csmDB;