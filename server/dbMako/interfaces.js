const pool = require('./connection.js');

let csmDB = {};


csmDB.listarTiposInterfaces = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT id, nombre, descripcion FROM ui_permission_tipo ORDER BY nombre ASC`, (err, results) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};

csmDB.listarUiPermissions = () => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT up.id, up.slug, up.descripcion, upt.id AS id_tipo, upt.nombre AS tipo
      FROM ui_permissions AS up
      LEFT JOIN ui_permission_tipo AS upt ON up.id_tipo = upt.id
      ORDER BY up.slug ASC
    `, (err, results) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};


csmDB.crearUiPermission = (slug, descripcion, id_tipo) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO ui_permissions (slug, descripcion, id_tipo)
      VALUES (?, ?, ?)
    `, [slug, descripcion, id_tipo], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

csmDB.uiPermissionsPorRol = (idRol) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT up.id, up.slug, up.descripcion, upt.nombre AS tipo
      FROM ui_permissions_has_rol AS uphr
      JOIN ui_permissions AS up ON up.id = uphr.id_ui_permission
      LEFT JOIN ui_permission_tipo AS upt ON up.id_tipo = upt.id
      WHERE uphr.id_rol_usuario = ?
      ORDER BY up.slug ASC
    `, [idRol], (err, results) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};


csmDB.actualizarUiPermissionsDeRol = (idRol, permisos) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ui_permissions_has_rol WHERE id_rol_usuario = ?`, [idRol], (err) => {
      if (err) return reject(err);

      if (!permisos || permisos.length === 0) return resolve(true);

      const values = permisos.map(idPerm => [idRol, idPerm]);
      pool.query(`INSERT INTO ui_permissions_has_rol (id_rol_usuario, id_ui_permission) VALUES ?`, [values], (err2) => {
        if (err2) return reject(err2);
        resolve(true);
      });
    });
  });
};

csmDB.rolesPorUiPermission = (idUiPermission) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT ru.id, ru.rol
      FROM ui_permissions_has_rol AS uphr
      JOIN rol_usuario AS ru ON uphr.id_rol_usuario = ru.id
      WHERE uphr.id_ui_permission = ?
    `, [idUiPermission], (err, results) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};

csmDB.actualizarRolesDeUiPermission = (idUiPermission, roles) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ui_permissions_has_rol WHERE id_ui_permission = ?`, [idUiPermission], (err) => {
      if (err) return reject(err);

      if (!roles || roles.length === 0) return resolve(true);

      const values = roles.map(idRol => [idRol, idUiPermission]);
      pool.query(`INSERT INTO ui_permissions_has_rol (id_rol_usuario, id_ui_permission) VALUES ?`, [values], (err2) => {
        if (err2) return reject(err2);
        resolve(true);
      });
    });
  });
};

csmDB.actualizarUiPermission = (id, descripcion, id_tipo) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE ui_permissions
      SET descripcion = ?, id_tipo = ?
      WHERE id = ?
    `, [descripcion, id_tipo, id], (err, results) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

csmDB.eliminarUiPermission = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ui_permissions WHERE id = ?`, [id], (err, result) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};


module.exports = csmDB;