const pool = require('./connection.js');

let csmDB = {};


csmDB.existe = (idUsuario) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT usu.* , '' AS pass
                        FROM usuario AS usu

                        WHERE usu.correo = ?

                        ORDER BY usu.id ASC
                        
                        `, [idUsuario], (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });

    })

};

csmDB.usuarioXid = (idUsuario) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT usu.* , '' AS pass
                        FROM usuario AS usu

                        WHERE usu.id = ?

                        ORDER BY usu.id ASC
                        
                        `, [idUsuario], (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });

    })

};

csmDB.rolesXid = (idUsuario) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT uhr.id_rol, ru.rol
                        FROM usuario AS usu

                        JOIN usuario_has_rol AS uhr
                        ON uhr.id_usuario = usu.id

                        JOIN rol_usuario AS ru
                        ON uhr.id_rol = ru.id

                        WHERE usu.id = ?

                        ORDER BY usu.id ASC
                        
                        `, [idUsuario], (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });

    })

};
/*  , ru.id AS id_rol_usuario, ru.*
JOIN usuario_has_rol AS uhr
                        ON uhr.id_usuario = usu.id

                        JOIN rol_usuario AS ru
                        ON ru.id = uhr.id_rol
                         */

csmDB.nuevoUsuario = (nombre, apellido, correo, pass, genero, tk_google, tk_facebook) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO usuario 
                    (nombres, apellidos, correo, pass, genero, tk_google, tk_facebook) 
                    VALUES (?, ?, ?, ?, ?, ?, ? )
                            
                            `, [nombre, apellido, correo, pass, genero, tk_google, tk_facebook], (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });

    })

};

csmDB.loginUsuario = (correo, pass) => {

    return new Promise((resolve, reject) => {


        if (pass) {

            pool.query(`SELECT usu.*
                FROM usuario AS usu
                WHERE usu.correo = ?
                
        `, [correo], (err, results) => {

                if (err) {
                    return reject(err);

                }else{
                    const response = results
        const responseJson = JSON.parse(JSON.stringify(response));
                    console.log(responseJson[0])

                    if (!responseJson.length) {
                        return reject(404);
                    } else {
                        const usuario = responseJson[0]
                        if (usuario.pass != '') {
                            if (usuario.pass == pass) {
                                if (usuario.pass != usuario.passTemp) {
                                    return resolve({...usuario, pass: '', passTemp: ''})
                                } else {
                                    return reject(409);
                                }
                            } else {
                                return reject(401);

                            }
                        } else {
                            return reject(406);
                        }
                    }

                }
            });


        } else {
            return reject(404);
        }




    })

};


csmDB.uiPermisosXid = (idUsuario) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT DISTINCT up.slug
            FROM usuario AS usu
            JOIN usuario_has_rol AS uhr ON uhr.id_usuario = usu.id
            JOIN rol_usuario AS ru ON uhr.id_rol = ru.id
            JOIN ui_permissions_has_rol AS uphr ON uphr.id_rol_usuario = ru.id
            JOIN ui_permissions AS up ON up.id = uphr.id_ui_permission
            WHERE usu.id = ?
            ORDER BY up.slug ASC
                    `, [idUsuario], (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results.map(p => p.slug)); // Devuelve array plano de slugs
            }
        });

    });

};

csmDB.listarUsuarios = () => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT id, nombres, apellidos, correo, genero
      FROM usuario
      ORDER BY id DESC
    `, (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      const response = JSON.parse(JSON.stringify(results));
      resolve(response);
    });
  });
};

csmDB.listarRolesDisponibles = () => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT id, rol 
      FROM rol_usuario
      ORDER BY rol ASC
    `, (err, results) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};

csmDB.actualizarRolesUsuario = (idUsuario, roles) => {
  return new Promise((resolve, reject) => {
    // Paso 1: eliminar roles existentes
    pool.query(`DELETE FROM usuario_has_rol WHERE id_usuario = ?`, [idUsuario], (err) => {
      if (err) return reject(err);

      // Si no hay roles que insertar, terminamos aquí
      if (!roles || roles.length === 0) return resolve(true);

      // Validar que cada rol sea numérico (opcional pero recomendado)
      const valores = roles.map(idRol => [idUsuario, idRol]).filter(v => Number.isInteger(v[1]));

      if (valores.length === 0) return resolve(true); // roles inválidos

      // Paso 2: insertar nuevos roles
      pool.query(`INSERT INTO usuario_has_rol (id_usuario, id_rol) VALUES ?`, [valores], (err2) => {
        if (err2) {
          console.error('Error en INSERT:', err2);
          return reject(err2);
        }
        resolve(true);
      });
    });
  });
};



module.exports = csmDB;