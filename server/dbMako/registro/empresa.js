const pool = require('../connection.js');
var moment = require('moment');

let csmDB = {};


csmDB.codXmail = (email) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM codigos WHERE email =  ?`, [email], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.initCode = (email, pass) => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM codigos WHERE codigos.registrando = 1  ORDER BY codigos.fechayHora DESC  LIMIT 1`, (err, results) => {

            if (err) {
                return reject(err);
            } else {

                let codigo = results[0].codigo
                console.log("codigo: init = " + codigo)
                pool.query(`UPDATE codigos SET email = ?, pass = ?, registrando = '2' WHERE codigos.codigo = ?`, [email, pass, codigo], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        pool.query(`SELECT * FROM codigos WHERE email =  ?`, [email], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {


                                return resolve(results);
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.crearEmpresa = (codigo, razon, slogan, descripcion, responsable) => {

    var fecha = new Date();


    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO empresa (codigo, fechaRegistro, nombre, slogan, descripcion,  responsableRegistro) VALUES (?,?,?,?,?,?)`, [codigo, fecha, razon, slogan, descripcion, responsable], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

// Crear empresa rápida
csmDB.crearEmpresaRapida = (codigo, nombre, idMunicipio = 0) => {
  const sql = `INSERT INTO empresa (codigo, nombre, id_municipio) VALUES (?,?,?)`;

  return new Promise((resolve, reject) => {
    pool.query(sql, [codigo, nombre, idMunicipio], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Obtener id de municipio por nombre
csmDB.idMunicipioPorNombre = (nombre) => {
  const sql = `SELECT id FROM municipio WHERE UPPER(nombre) = UPPER(?) LIMIT 1`;

  return new Promise((resolve, reject) => {
    pool.query(sql, [nombre], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]?.id || 0);
    });
  });
};


/* ============================================================== */
/* Insertar teléfonos – SIEMPRE crea un nuevo registro            */
/* ============================================================== */
csmDB.insertarTelefonos = (codigoEmpresa, telefonos = []) => {
  if (!telefonos.length) return Promise.resolve();

  return telefonos.reduce((chain, numero) => {
    return chain.then(() => {
      /* 1) Insertar SIEMPRE un nuevo registro en telefonos */
      return new Promise((resolve, reject) => {
        pool.query(
          'INSERT INTO telefonos (telefono) VALUES (?)',
          [numero],
          (err, res) => (err ? reject(err) : resolve(res.insertId))
        );
      })
      .then((idTel) => {
        /* 2) Insertar relación en la tabla puente               */
        return new Promise((resolve, reject) => {
          pool.query(
            `INSERT INTO empresa_has_telefonos
               (empresa_codigo, telefonos_id_telefono)
             VALUES (?,?)`,
            [codigoEmpresa, idTel],
            (err2) => (err2 ? reject(err2) : resolve())
          );
        });
      });
    });
  }, Promise.resolve());
};


/* ──────────────────────────────────────────────────────────────
   Agregar favorito (ON DUPLICATE UPDATE)
   ---------------------------------------------------------------- */
// dbMako/empresas.js
csmDB.agregarFavorito = (
  idUsuario, codigoEmpresa, label, nota = '', notificar = 0, origen = 'web'
) => {
  const sql = `
    INSERT INTO usuario_has_favorito
      (idUsuario, codigo_empresa, label, nota, notificar, origen)
    VALUES (?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE
      label      = VALUES(label),
      nota       = VALUES(nota),
      notificar  = VALUES(notificar),
      origen     = VALUES(origen)
  `;

  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [idUsuario, codigoEmpresa, label, nota, notificar, origen],
      (err, res) => {
        if (err) return reject(err);
        /* affectedRows: 1 → INSERT  |  2 → UPDATE */
        const yaExistia = res.affectedRows === 2;
        resolve({ ok: true, yaExistia });
      }
    );
  });
};



csmDB.crearEmpresaBasica = (codigo, ext, nombre, slogan, descripcion, direccion, categoria, telefono, correo, municipio, tags, wp, tipoTelefono) => {

    var fecha = new Date();


    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO empresa (codigo, nombre, slogan, descripcion, direccion, id_municipio, palabras_clave, fechaRegistro, oculto, activo, url_logo, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, [codigo, nombre, slogan, descripcion, direccion, municipio, tags, fecha, 0, 1, `logos/${codigo}.${ext}`, 0], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                pool.query(`INSERT INTO categoria (categoria) VALUES (?)`, [categoria], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        let idCat = results.insertId

                        pool.query(`INSERT INTO empresa_has_categoria (id_empresa, idCat) VALUES (?, ?)`, [codigo, idCat], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                pool.query(`INSERT INTO telefonos (telefono, dependencia, tipo, wp, principal) VALUES (?, ?, ?, ?, ?)`, [telefono, 'General', tipoTelefono, wp, 1], (err, results) => {

                                    if (err) {
                                        return reject(err);
                                    } else {
                                        let idTelefono = results.insertId

                                        pool.query(`INSERT INTO empresa_has_telefonos (empresa_codigo, telefonos_id_telefono) VALUES (?, ?)`, [codigo, idTelefono], (err, results) => {

                                            if (err) {
                                                return reject(err);
                                            } else {
                                                pool.query(`INSERT INTO correo (correo, principal) VALUES (?, ?)`, [correo, 1], (err, results) => {

                                                    if (err) {
                                                        return reject(err);
                                                    } else {
                                                        let idCorreo = results.insertId

                                                        pool.query(`INSERT INTO empresa_has_correo (empresa_codigo, correo_idcorreo) VALUES (?, ?)`, [codigo, idCorreo], (err, results) => {

                                                            if (err) {
                                                                return reject(err);
                                                            } else {
                                                                resolve(results)
                                                            }

                                                        })
                                                    }

                                                })
                                            }

                                        })
                                    }

                                })
                            }

                        })
                    }

                })





            }
        });

    })

};



csmDB.activarEmpresa = (codigo, cupon) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET activo = 1, oculto = 0 WHERE empresa.codigo = ?`, [codigo], (err, results) => {

            if (err) {
                return reject(err);
            } else {

                pool.query(`INSERT INTO empresa_use_cupon (empresa_codigo, cupon_id) VALUES (?,?)`, [codigo, cupon], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {


                        return resolve(results);
                    }
                });
            }

        });

    })

};



csmDB.actualizaPaso = (codigo, paso) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE codigos SET registrando = ?, fechayHora = ? WHERE codigos.codigo = ?`, [paso, fecha, codigo], (err, results) => {

            if (err) {
                return reject(err);
            } else {

                return resolve(results);
            }

        });

    })

};


csmDB.actualizaUrlLogo = (codigo) => {
    let cod = 'logos/' + codigo + '.jpg';
    console.log(cod)
    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET url_logo = ?  WHERE empresa.codigo = ?`, [cod, codigo], (err, results) => {

            if (err) {
                return reject(err);
            } else {

                return resolve(results);
            }

        });

    })

};



csmDB.updateMunicipioEmpresa = (codigo, idMunicipio) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET id_municipio = ?  WHERE empresa.codigo = ?`, [idMunicipio, codigo], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                return resolve(results);
            }

        });

    })

};

csmDB.updateUbicacion = (codigo, direccion, municipio, barrio, lat, lng) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET id_municipio = ?, direccion = ?, barrio = ?, lat = ?, lng = ?  WHERE empresa.codigo = ?`, [municipio, direccion, barrio, lat, lng, codigo], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                return resolve(results);
            }

        });

    })

};


csmDB.updateWeb = (codigo, web) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET pagina_web = ?  WHERE empresa.codigo = ?`, [web, codigo], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                return resolve(results);
            }

        });

    })

};


csmDB.agregarMail = (codigo, correo, principal) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO correo (correo,principal) VALUES (?,?)`, [correo, principal], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`select MAX(idcorreo) AS idCorreo from correo`, (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {
                        const idCorreo = (results[0].idCorreo)

                        pool.query(`INSERT INTO empresa_has_correo (empresa_codigo, correo_idcorreo) VALUES (?, ?);`, [codigo, idCorreo], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                return resolve(results);
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.borrarMail = (idCorreo) => {

    return new Promise((resolve, reject) => {

        pool.query(`DELETE FROM empresa_has_correo WHERE empresa_has_correo.correo_idcorreo = ?`, [idCorreo], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`DELETE FROM correo WHERE correo.idcorreo = ?`, [idCorreo], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results);
                    }
                });
            }

        });

    })

};

csmDB.editarMail = (idCorreo, correo) => {

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE correo SET correo = ? WHERE correo.idcorreo = ?`, [correo, idCorreo], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                return resolve(results);

            }

        });

    })

};

csmDB.agregarTelefono = (codigo, telefono, dependencia, tipo, wp) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO telefonos (telefono, dependencia, tipo, wp) VALUES (?,?,?,?)`, [telefono, dependencia, tipo, wp], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`select MAX(id_telefono) AS idTelefono from telefonos`, (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {
                        const idTelefono = (results[0].idTelefono)

                        pool.query(`INSERT INTO empresa_has_telefonos (empresa_codigo, telefonos_id_telefono) VALUES (?, ?);`, [codigo, idTelefono], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                return resolve(results);
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.editarTelefono = (idTelefono, telefono, dependencia, tipo, wp) => {

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE telefonos SET telefono = ?, dependencia = ?, tipo = ?, wp = ? WHERE telefonos.id_telefono = ?`, [telefono, dependencia, tipo, wp, idTelefono], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                return resolve(results);

            }

        });

    })

};


csmDB.borrarTelefono = (idTelefono) => {

    return new Promise((resolve, reject) => {

        pool.query(`DELETE FROM empresa_has_telefonos WHERE empresa_has_telefonos.telefonos_id_telefono = ?`, [idTelefono], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`DELETE FROM telefonos WHERE telefonos.id_telefono = ?`, [idTelefono], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results);
                    }
                });
            }

        });

    })

};



csmDB.agregarRed = (codigo, red, usuarioRed) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO socialNetwork (tipoSocial, link) VALUES (?,?)`, [red, usuarioRed], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`select MAX(id) AS idSocial from socialNetwork`, (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {
                        const idSocial = (results[0].idSocial)

                        pool.query(`INSERT INTO empresa_has_socialNet (empresa_codigo, idSocial) VALUES (?, ?);`, [codigo, idSocial], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                return resolve(results);
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.borrarRed = (idRed) => {

    return new Promise((resolve, reject) => {

        pool.query(`DELETE FROM empresa_has_socialNet WHERE empresa_has_socialNet.idSocial = ?`, [idRed], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`DELETE FROM socialNetwork WHERE socialNetwork.id = ?`, [idRed], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results);
                    }
                });
            }

        });

    })

};


csmDB.agregarJornadaDividida = (codigo, tipoHorario, mananaDe, mananaA, tardeDe, tardeA) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO horario (tipoHorario) VALUES (?)`, [tipoHorario], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`select MAX(idhorario) AS idhorario from horario`, (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {
                        const idhorario = (results[0].idhorario)

                        pool.query(`INSERT INTO empresa_has_horario (empresa_codigo, horario_idhorario) VALUES (?, ?);`, [codigo, idhorario], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                pool.query(`INSERT INTO jornadas (tipojornada, de ,a) VALUES (?, ?, ?);`, [1, mananaDe, mananaA], (err, results) => {

                                    if (err) {
                                        return reject(err);
                                    } else {
                                        pool.query(`select MAX(idjornadas) AS idjornadas from jornadas`, (err, results) => {

                                            if (err) {
                                                return reject(err);
                                            } else {
                                                const idjornada = (results[0].idjornadas)

                                                pool.query(`INSERT INTO horario_has_jornadas (horario_idhorario, jornadas_idjornadas) VALUES (?, ?);`, [idhorario, idjornada], (err, results) => {

                                                    if (err) {
                                                        return reject(err);
                                                    } else {
                                                        pool.query(`INSERT INTO jornadas (tipojornada, de ,a) VALUES (?, ?, ?);`, [2, tardeDe, tardeA], (err, results) => {

                                                            if (err) {
                                                                return reject(err);
                                                            } else {
                                                                pool.query(`select MAX(idjornadas) AS idjornadas from jornadas`, (err, results) => {

                                                                    if (err) {
                                                                        return reject(err);
                                                                    } else {
                                                                        const idjornada = (results[0].idjornadas)

                                                                        pool.query(`INSERT INTO horario_has_jornadas (horario_idhorario, jornadas_idjornadas) VALUES (?, ?);`, [idhorario, idjornada], (err, results) => {

                                                                            if (err) {
                                                                                return reject(err);
                                                                            } else {
                                                                                return resolve(results);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });

                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.agregarJornadaContinua = (codigo, tipoHorario, continuaDe, continuaA) => {

    return new Promise((resolve, reject) => {

        pool.query(`INSERT INTO horario (tipoHorario) VALUES (?)`, [tipoHorario], (err, results) => {

            if (err) {
                console.log(err)
                return reject(err);
            } else {

                pool.query(`select MAX(idhorario) AS idhorario from horario`, (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {
                        const idhorario = (results[0].idhorario)

                        pool.query(`INSERT INTO empresa_has_horario (empresa_codigo, horario_idhorario) VALUES (?, ?);`, [codigo, idhorario], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                pool.query(`INSERT INTO jornadas (tipojornada, de ,a) VALUES (?, ?, ?);`, [3, continuaDe, continuaA], (err, results) => {

                                    if (err) {
                                        return reject(err);
                                    } else {
                                        pool.query(`select MAX(idjornadas) AS idjornadas from jornadas`, (err, results) => {

                                            if (err) {
                                                return reject(err);
                                            } else {
                                                const idjornada = (results[0].idjornadas)

                                                pool.query(`INSERT INTO horario_has_jornadas (horario_idhorario, jornadas_idjornadas) VALUES (?, ?);`, [idhorario, idjornada], (err, results) => {

                                                    if (err) {
                                                        return reject(err);
                                                    } else {
                                                        return resolve(results);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }

        });

    })

};


csmDB.borrarHorario = (idHorario) => {

    return new Promise((resolve, reject) => {


        pool.query(`select jo.*, tj.descripcion as descJornada
                            from horario as ho

                            join horario_has_jornadas as hj 
                            on hj.horario_idhorario = ho.idhorario

                            join jornadas as jo
                            on jo.idjornadas = hj.jornadas_idjornadas

                            join tipoJornada as tj
                            on jo.tipojornada = tj.id 
                            

                            where ho.idhorario = ?`, [idHorario], (err, results) => {

            if (err) {
                return reject(err);
            } else {

                results.map((item) => {
                    pool.query(`DELETE FROM horario_has_jornadas WHERE horario_has_jornadas.jornadas_idjornadas = ?`, [item.idjornadas], (err, results) => {

                        if (err) {
                            console.log(err)
                            return reject(err);
                        } else {

                            pool.query(`DELETE FROM jornadas WHERE jornadas.idjornadas = ?`, [item.idjornadas], (err, results) => {

                                if (err) {
                                    console.log(err)
                                    return reject(err);
                                }
                            });
                        }

                    });
                })

                pool.query(`DELETE FROM empresa_has_horario WHERE empresa_has_horario.horario_idhorario = ?`, [idHorario], (err, results) => {

                    if (err) {
                        console.log(err)
                        return reject(err);
                    } else {

                        pool.query(`DELETE FROM horario WHERE horario.idhorario = ?`, [idHorario], (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                return resolve(results);
                            }
                        });
                    }

                });


            }
        });





    })

};


csmDB.updateInformacionAdicional = (codigo, categoria, domicilio, costoDomi, VChoras, datafono, transBancol, transDavi, domiCovid, tags) => {

    var fecha = new Date();

    return new Promise((resolve, reject) => {

        pool.query(`UPDATE empresa SET domicilio = ?, costo_domicilio = ?, vc_horas = ?, datafono = ?, transBanCol = ?, transDavi = ?, domiCovid = ?, palabras_clave = ?
                        
                        WHERE empresa.codigo = ?`, [domicilio, costoDomi, VChoras, datafono, transBancol, transDavi, domiCovid, tags, codigo], (err, results) => {

            if (err) {
                return reject(err);
            } else {

                pool.query(`INSERT INTO categoria (categoria) VALUES (?);`, [categoria], (err, results) => {

                    if (err) {
                        return reject(err);
                    } else {
                        pool.query(`select MAX(idCat) AS idCategoria from categoria`, (err, results) => {

                            if (err) {
                                return reject(err);
                            } else {
                                const idCategoria = (results[0].idCategoria)

                                pool.query(`INSERT INTO empresa_has_categoria (id_empresa, idCat) VALUES (?, ?);`, [codigo, idCategoria], (err, results) => {

                                    if (err) {
                                        return reject(err);
                                    } else {
                                        return resolve(results);
                                    }
                                });
                            }
                        });
                    }
                });
            }

        });

    })

};


module.exports = csmDB;