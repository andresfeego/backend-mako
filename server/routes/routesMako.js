const express = require('express');
const slides = require('../dbMako/slides');
const ciudades = require('../dbMako/ciudades');
const empresas = require('../dbMako/empresas')
const auxiliares = require('../dbMako/auxiliares')
const bitacora = require('../dbMako/bitacora')
const empresa = require('../dbMako/registro/empresa')
const AuxiImports = require('../dbMako/registro/AuxiImports')
const redes = require('../dbMako/redes')
const horarios = require('../dbMako/horarios')
const categorias = require('../dbMako/categorias')
const cuponMako = require('../dbMako/registro/cuponMako')
const usuario = require('../dbMako/usuario')
const interfaces = require('../dbMako/interfaces')
const GPT = require('../dbMako/GPT');

const verificarJWT = require('../dbMako/middleware/verificarJWT');

const path = require('path');
const multer = require('multer');

const router = express.Router();
var bodyParser = require('body-parser');
const isProd = process.env.NODE_ENV === 'production';

// Multer en memoria: máx 2 imágenes
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: { files: 2 },
        });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));



generaCodigoEmpresa = () => {
    return new Promise(async (resolve, reject) => {
        var codigo = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            codigo += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        try {
            let results = await auxiliares.verificarCodigo(codigo);
            console.log(results.length)
            if (results.length == 0) {
                resolve(codigo)
            } else {
                generaCodigoEmpresa().then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }
            resolve(results);
        } catch (e) {
            console.log(e);
            reject(e)
        }

    })
}


//__________________________ USUARIOS ______________________________________

router.get('/usuario/listarUsuarios', async (req, res) => {
    try {
        const usuarios = await usuario.listarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

router.get('/usuario/listarRolesDisponibles', async (req, res) => {
    try {
        const roles = await usuario.listarRolesDisponibles();
        res.json(roles);
    } catch (err) {
        console.error("Error al listar roles:", err);
        res.status(500).json({ error: 'Error al listar roles disponibles' });
    }
});

router.post('/usuario/actualizarRolesUsuario', async (req, res) => {
    try {
        const { idUsuario, roles } = req.body;
        console.log('[BACKEND] Recibido:', idUsuario, roles);

        await usuario.actualizarRolesUsuario(idUsuario, roles);

        console.log('[BACKEND] Roles actualizados con éxito');
        res.json({ ok: true });
    } catch (err) {
        console.error('[BACKEND] Error en actualización de roles:', err);
        res.status(500).json({ ok: false, error: 'Error al actualizar roles' });
    }
});

router.get('/usuario/usuarioExiste/:idUsuario', async (req, res, next) => {

    try {
        let results = await usuario.existe(req.params.idUsuario);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/usuario/usuarioXid/:idUsuario', async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;

        const usuarioBase = await usuario.usuarioXid(idUsuario);
        if (!usuarioBase || usuarioBase.length === 0) return res.status(404).json([]);

        const roles = await usuario.rolesXid(idUsuario);
        const permisos = await usuario.uiPermisosXid(idUsuario);

        const usuarioFinal = {
            ...usuarioBase[0],
            roles: roles.map(r => r.id_rol),
            rolesDB: roles,
            uiPermisos: permisos, // ← Aquí se agregan los slugs
        };

        res.json(usuarioFinal);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



router.get('/usuario/rolesXid/:idUsuario', async (req, res, next) => {

    try {
        let results = await usuario.rolesXid(req.params.idUsuario);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/usuario/nuevoUsuario', async (req, res, next) => {

    try {
        let results = await usuario.nuevoUsuario(req.body.nombre, req.body.apellido, req.body.correo, req.body.pass, req.body.genero, req.body.tkgoogle, req.body.tkfacebook);
        const insertId = results.insertId;

        /* const token = jwt.sign(
            { userId:insertId, correo: req.body.correo },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          );

        const cookie = serialize('makoSession', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    
        res.setHeader('Set-Cookie', cookie); */

        // 🔥 Responder como antes
        console.log(insertId)
        res.status(200).json({ userId: insertId, uiPermisos: [] });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');


router.post('/usuario/loginSocial', async (req, res) => {
    try {
        const { correo } = req.body;
        const results = await usuario.existe(correo);
        const user = results[0];

        if (!user || !user.id) throw 404;

        const uiPermisos = await usuario.uiPermisosXid(user.id);

        /* const token = jwt.sign(
          { userId: user.id, correo: user.correo },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
    
        const cookie = serialize('makoSession', token, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? 'none' : 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
    
        res.setHeader('Set-Cookie', cookie);
        */
        res.status(200).json({ success: true, userId: user.id, uiPermisos });

    } catch (err) {
        switch (err) {
            case 404:
                return res.status(200).json({
                    error: 404,
                    message: 'Usuario no encontrado para este método de acceso.',
                });
            default:
                console.error('[loginSocial] ❌', err);
                return res.status(200).json({
                    error: 500,
                    message: 'Error interno al procesar el inicio de sesión social.',
                });
        }
    }
});


router.post('/usuario/loginUsuario', async (req, res) => {
    try {
        const results = await usuario.loginUsuario(req.body.correo, req.body.pass);
        const userId = results.id;

        // Obtener permisos
        const uiPermisos = await usuario.uiPermisosXid(userId);

        /* const payload = {
          userId,
          correo: results.correo,
          origen: results.origen,
        };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    
        const cookie = serialize('makoSession', token, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? 'none' : 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
    
        res.setHeader('Set-Cookie', cookie); */
        res.status(200).json({ success: true, userId, uiPermisos });

    } catch (err) {
        switch (err) {
            case 404: return res.status(200).json({ error: 404, message: 'Verificar credenciales ingresadas.' });
            case 401: return res.status(200).json({ error: 401, message: 'Contraseña incorrecta' });
            case 406: return res.status(200).json({ error: 406, message: 'Usuario sin contraseña asignada' });
            case 409: return res.status(200).json({ error: 409, message: 'Ingreso con contraseña temporal' });
            default: return res.sendStatus(500);
        }
    }
});


router.post('/usuario/logout', (req, res) => {


    /*  const cookie = serialize('makoSession', '', {
       httpOnly: true,
       secure: isProd,
       sameSite: isProd ? 'none' : 'lax',
       path: '/',
       maxAge: 0,
     });
   
     res.setHeader('Set-Cookie', cookie);
     console.log('[LOGOUT] Cookie eliminada correctamente'); */
    res.status(200).json({ success: true });
});

router.get('/usuario/sessionActiva', verificarJWT, (req, res) => {
    res.status(200).json({
        active: true,
        userId: req.user.userId,
    });
});

//__________________________ GPT ______________________________________

/*──────────────────────────────────────────────
  POST /api/responseMako/gpt/extraerNumeroSiguiente
  Body JSON: { "entrada": "xv" }
──────────────────────────────────────────────*/
router.post('/gpt/extraerNumeroSiguiente', async (req, res) => {
    try {
        const { entrada } = req.body;
        if (!entrada)
            return res.status(400).json({ error: 'Falta parámetro: entrada' });

        const json = await GPT.consultarNumeroSiguiente(entrada);
        res.json({ ok: true, resultado: json });
    } catch (err) {
        console.error('❌ /gpt/extraerNumeroSiguiente:', err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

/*──────────────────────────────────────────────
  POST /api/responseMako/gpt/extraerDatosTarjeta
  FormData: images (1-2 archivos)  key = images
──────────────────────────────────────────────*/
router.post('/gpt/extraerDatosTarjeta', upload.array('images', 2), async (req, res) => {
    try {
        
        if (!req.files || !req.files.length)
            return res.status(400).json({ error: 'No se adjuntaron imágenes 🍳' });

        // Buffers → Base64
        const b64Arr = req.files.map((f) => f.buffer.toString('base64'));

        const datos = await GPT.extraerDatosTarjeta(b64Arr);
        res.json(datos);
    } catch (err) {
        console.error('❌ /gpt/extraerDatosTarjeta:', err);
        res.status(500).json({ ok: false, error: err.message });
    }
}
);

//__________________________ INTERFACE ______________________________________

// Obtener tipos de interfaces
router.get('/interface/listarTiposInterfaces', async (req, res) => {
    try {
        const tipos = await interfaces.listarTiposInterfaces();
        res.json(tipos);
    } catch (err) {
        console.error('[interface] Error al listar tipos:', err);
        res.status(500).json({ error: 'Error al listar tipos de interfaces' });
    }
});

// Obtener todas las interfaces (ui_permissions)
router.get('/interface/listarUiPermissions', async (req, res) => {
    try {
        const permisos = await interfaces.listarUiPermissions();
        res.json(permisos);
    } catch (err) {
        console.error('[interface] Error al listar permisos:', err);
        res.status(500).json({ error: 'Error al listar permisos' });
    }
});

// Obtener permisos por rol
router.get('/interface/uiPermissionsPorRol/:id', async (req, res) => {
    try {
        const permisos = await interfaces.uiPermissionsPorRol(req.params.id);
        res.json(permisos);
    } catch (err) {
        console.error('[interface] Error al obtener permisos por rol:', err);
        res.status(500).json({ error: 'Error al obtener permisos del rol' });
    }
});

// Crear nueva interfaz
router.post('/interface/crearUiPermission', async (req, res) => {
    try {
        const { slug, descripcion, id_tipo } = req.body;
        const id = await interfaces.crearUiPermission(slug, descripcion, id_tipo);
        res.json({ ok: true, id });
    } catch (err) {
        console.error('[interface] Error al crear interfaz:', err);
        res.status(500).json({ error: 'Error al crear interfaz' });
    }
});

// Actualizar permisos asignados a un rol
router.post('/interface/actualizarUiPermissionsRol', async (req, res) => {
    try {
        const { idRol, permisos } = req.body;
        await interfaces.actualizarUiPermissionsDeRol(idRol, permisos);
        res.json({ ok: true });
    } catch (err) {
        console.error('[interface] Error al actualizar permisos de rol:', err);
        res.status(500).json({ error: 'Error al actualizar permisos del rol' });
    }
});

router.get('/interface/rolesPorUiPermission/:id', async (req, res) => {
    try {
        const permisos = await interfaces.rolesPorUiPermission(req.params.id);
        res.json(permisos);
    } catch (err) {
        console.error('[interface] Error al obtener roles por interfaz:', err);
        res.status(500).json({ error: 'Error al obtener roles de la interfaz' });
    }
});

router.post('/interface/actualizarRolesDeUiPermission', async (req, res) => {
    try {
        const { idUiPermission, roles } = req.body;
        await interfaces.actualizarRolesDeUiPermission(idUiPermission, roles);
        res.json({ ok: true });
    } catch (err) {
        console.error('[interface] Error al actualizar roles de interfaz:', err);
        res.status(500).json({ error: 'Error al actualizar roles de la interfaz' });
    }
});

router.post('/interface/actualizarUiPermission', async (req, res) => {
    try {
        const { id, descripcion, id_tipo } = req.body;
        await interfaces.actualizarUiPermission(id, descripcion, id_tipo);
        res.json({ ok: true });
    } catch (err) {
        console.error('[interface] Error al actualizar interfaz:', err);
        res.status(500).json({ error: 'Error al actualizar interfaz' });
    }
});

router.delete('/interface/eliminarUiPermission/:id', async (req, res) => {
    try {
        await interfaces.eliminarUiPermission(req.params.id);
        res.json({ ok: true });
    } catch (err) {
        console.error('[interface] Error al eliminar:', err);

        if (err?.errno === 1451) {
            return res.status(400).json({
                error: 'Esta interfaz tiene roles relacionados. Elimínalos primero.',
                errno: 1451
            });
        }

        res.status(500).json({ error: 'Error al eliminar interfaz' });
    }
});

router.get('/usuario/uiPermisosXid/:idUsuario', async (req, res) => {
    try {
        const permisos = await usuario.uiPermisosXid(req.params.idUsuario);
        res.json(permisos);
    } catch (err) {
        console.error('[usuario] Error al obtener uiPermisosXid:', err);
        res.status(500).json({ error: 'Error al obtener permisos del usuario' });
    }
});



//__________________________ BITACORA  ______________________________________

router.get('/usuario/ui-permisos', async (req, res) => {
    const { id_usuario } = req.query;
    if (!id_usuario) {
        return res.status(400).json({ error: "Falta id_usuario" });
    }

    try {
        const permisos = await usuario.uiPermisosXid(id_usuario);
        res.json({ permisos });
    } catch (error) {
        console.error("Error obteniendo permisos:", error);
        res.status(500).json({ error: "Error interno" });
    }
});





//__________________________ BITACORA  ______________________________________

router.post('/bitacora/nuevoEvento', async (req, res, next) => {

    try {
        let results = await bitacora.nuevoEventoBitacora(req.body.tipoAccion, req.body.flujo, req.body.etiqueta, req.body.hashSession, req.body.authenticated, req.body.usuario, req.body.dispositivo, req.body.navegador, req.body.plataforma, req.body.pais);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/bitacora/busquedasPalabra', async (req, res, next) => {

    try {
        let results = await bitacora.busquedasPalabra();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.get('/bitacora/flujosNavegacion', async (req, res, next) => {

    try {
        let results = await bitacora.flujosNavegacion();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

//__________________________ AUXILIARES ______________________________________


router.get('/domiciliariosXciudad/:idCiudad', async (req, res, next) => {

    try {
        let results = await auxiliares.domiciliariosXciudad(req.params.idCiudad);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});



router.get('/categoriasConEmpresas', async (req, res, next) => {

    try {
        let results = await auxiliares.categoriasConEmpresas();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/ciudadesConEmpresas', async (req, res, next) => {

    try {
        let results = await auxiliares.ciudadesConEmpresas();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/ciuycatConEmpresas', async (req, res, next) => {

    try {
        let results = await auxiliares.ciuycatConEmpresas();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

//__________________________ SLIDES ______________________________________

router.get('/slides', async (req, res, next) => {

    try {
        let results = await slides.slidesIntro();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


//__________________________ CATEGORIAS ______________________________________

router.get('/categorias', async (req, res, next) => {

    try {
        let results = await categorias.categorias();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/categoriasCompletas/:busqueda', async (req, res, next) => {

    try {
        let results = await categorias.categoriasCompletas(req.params.busqueda);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.get('/subcategoria1/:id', async (req, res, next) => {

    try {
        let results = await categorias.subCat1(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/subcategoria2/:id', async (req, res, next) => {

    try {
        let results = await categorias.subCat2(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/subcategoria2Xid/:id', async (req, res, next) => {

    try {
        let results = await categorias.subCat2Xid(req.params.id);
        console.log(results)
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});





//__________________________ CIUDADES ______________________________________

router.get('/ciudades/barriociudad/:id', async (req, res, next) => {

    try {
        let results = await ciudades.barrioCiudadXid(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});



router.get('/ciudades', async (req, res, next) => {

    try {
        let results = await ciudades.ciudades();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/departamentos', async (req, res, next) => {

    try {
        let results = await ciudades.departamentos();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/municipios/:codDep', async (req, res, next) => {

    try {
        let results = await ciudades.municipios(req.params.codDep);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.get('/listaMunicipios', async (req, res, next) => {

    try {
        let results = await ciudades.listaMunicipios();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.get('/barrios/:idMunicipio', async (req, res, next) => {

    try {
        let results = await ciudades.barrios(req.params.idMunicipio);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/departamentosMunicipios', async (req, res, next) => {

    try {
        let results = await ciudades.departamentosMunicipios();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});




//__________________________ EMPRESAS ______________________________________

router.post('/empresas', async (req, res, next) => {
    try {
        let results = await empresas.empresas(req.body.ciudad, req.body.busServicios, req.body.busCategoria, req.body.limInf, req.body.limSup);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/tipoEmpresa/:id', async (req, res, next) => {

    try {
        let results = await empresas.tipoEmpresa(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/:id', async (req, res, next) => {

    try {
        let results = await empresas.empresaXcodigo(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/imagenesSlide/:id', async (req, res, next) => {

    try {
        let results = await empresas.imagenesSlide(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/categoria/:id', async (req, res, next) => {

    try {
        let results = await empresas.categoria(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/telefonos/:id', async (req, res, next) => {

    try {
        let results = await empresas.telefonos(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/emails/:id', async (req, res, next) => {

    try {
        let results = await empresas.emails(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/redes/:id', async (req, res, next) => {

    try {
        let results = await empresas.redes(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/horarios/:id', async (req, res, next) => {

    try {
        let results = await empresas.horarios(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/empresas/horarios/jornadas/:id', async (req, res, next) => {

    try {
        let results = await empresas.jornadas(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});



//_________________________________________  REGISTRO EMPRESAS ___________________________________



router.get('/empresas/registro/codXmail/:email', async (req, res, next) => {

    try {
        let results = await empresa.codXmail(req.params.email);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/initCode', async (req, res, next) => {

    try {
        let results = await empresa.initCode(req.body.email, req.body.pass);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/crearEmpresa', async (req, res, next) => {

    try {
        let results = await empresa.crearEmpresa(req.body.codigo, req.body.razon, req.body.slogan, req.body.descripcion, req.body.responsable);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Body esperado:
 * {
 *   idUsuario: 7,
 *   nombre: "Cerrajero del Centro",
 *   telefonos: ["321546875"],
 *   nota: "",
 *   notificar: 0,
 *   id_municipio: 0,            // opcional
 *   confirm: false,             // 1ª llamada = false / 2ª llamada = true
 *   codigoEmpresaConfirmada: "" // solo si confirm === true y elige empresa existente
 * }
 */
router.post('/empresas/crearEmpresaRapida', async (req, res) => {
    try {
        const {
            idUsuario,
            nombre,
            telefonos = [],
            nota = '',
            notificar = 0,
            id_municipio = 0,
            confirm = false,
            codigoEmpresaConfirmada = ''
        } = req.body;

        if (!idUsuario || !nombre || telefonos.length === 0) {
            return res.status(400).json({ error: 'Datos obligatorios faltantes' });
        }

        /* ---------- PRIMERA LLAMADA: solo validar teléfonos ---------- */
        if (!confirm) {
            const coincidencias = await empresas.buscarPorTelefonos(telefonos);
            if (coincidencias.length) {
                return res.json({ existe: true, empresas: coincidencias });
            }
            // Si no hay coincidencias continuamos creando nueva empresa
        }

        let codigoEmpresa = codigoEmpresaConfirmada;

        /* ---------- Si usuario eligió empresa existente ---------- */
        if (confirm && codigoEmpresa) {
            // Insertar favorito directamente
            const resFav = await empresa.agregarFavorito(idUsuario, codigoEmpresa, nombre, nota, notificar);
            return res.json({ ok: true, codigo: codigoEmpresa, favorito: true, existente: true, yaExistia: resFav.yaExistia });
        }

        /* ---------- Crear empresa nueva + teléfonos ---------- */
        if (!codigoEmpresa) {
            codigoEmpresa = await generaCodigoEmpresa();

            // Resolver municipio (Bogotá por defecto)
            let municipioFinal = id_municipio;
            if (municipioFinal === 0) {
                municipioFinal = await empresa.idMunicipioPorNombre('BOGOTA');
            }

            // 1. Empresa mínima
            await empresa.crearEmpresaRapida(codigoEmpresa, nombre, municipioFinal);

            // 2. Teléfonos
            await empresa.insertarTelefonos(codigoEmpresa, telefonos);

            // 3. Favorito
            await empresa.agregarFavorito(idUsuario, codigoEmpresa, nombre, nota, notificar);
        }

        res.json({ ok: true, codigo: codigoEmpresa, favorito: true, existente: false });
    } catch (err) {
        console.error('[crearEmpresaRapida] ❌', err);
        res.sendStatus(500);
    }
});


router.post('/empresas/registro/actualizaPaso', async (req, res, next) => {

    try {
        let results = await empresa.actualizaPaso(req.body.codigo, req.body.paso);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/activarEmpresa', async (req, res, next) => {

    try {
        let results = await empresa.activarEmpresa(req.body.codigo, req.body.cupon);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/actualizaUrlLogo', async (req, res, next) => {

    try {
        let results = await empresa.actualizaUrlLogo(req.body.codigo);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});



router.post('/uploadLogo', async function (req, res) {
    generaCodigoEmpresa().then((codigo) => {

        const storage = multer.diskStorage({
            destination: '../public_html/scrAppServer/images/logos/',
            filename: function (req, file, cb) {
                cb(null, codigo + path.extname(file.originalname));

            }
        })
        const upload = multer({
            storage: storage
        }).single('image');

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
            } else {

                return res.status(200).json({ image: req.file, codigo: codigo });
            }
        })

    }).catch((err) => {
        console.log(err)
        res.sendStatus(500);
    })


});

router.post('/crearEmpresaBasica', async function (req, res) {

    try {
        const { codigo, ext, nombre, slogan, descripcion, direccion, categoria, telefono, correo, municipio, tagsText, wp, tipoTelefono } = req.body
        let results = await empresa.crearEmpresaBasica(codigo, ext, nombre, slogan, descripcion, direccion, categoria, telefono, correo, municipio, tagsText, wp, tipoTelefono);
        res.json({ ok: 'ok' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/* 
router.post('/uploadLogo/:nombreImagen', upload.single('image'), async function (req, res) {
    const imagePath = path.join(__dirname, '../../../src/logos');
    console.log("path = " + imagePath)
    const fileUpload = new Resize(imagePath, req.params.nombreImagen+'.jpg', 600);
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }

    try{
        const filename = await fileUpload.save(req.file.buffer);
        return res.status(200).json({ name: filename });
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
  });
 */

router.post('/empresas/updateMunicipioEmpresa', async (req, res, next) => {

    try {
        let results = await empresa.updateMunicipioEmpresa(req.body.codigo, req.body.idMunicipio);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/updateUbicacion', async (req, res, next) => {

    try {
        let results = await empresa.updateUbicacion(req.body.codigo, req.body.direccion, req.body.municipio, req.body.barrio, req.body.lat, req.body.lng);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/updateWeb', async (req, res, next) => {

    try {
        let results = await empresa.updateWeb(req.body.codigo, req.body.web);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/agregarMail', async (req, res, next) => {

    try {
        let results = await empresa.agregarMail(req.body.codigo, req.body.correo, req.body.principal);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/borrarMail', async (req, res, next) => {

    try {
        let results = await empresa.borrarMail(req.body.idCorreo);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/editarMail', async (req, res, next) => {

    try {
        let results = await empresa.editarMail(req.body.idCorreo, req.body.correo);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/agregarTelefono', async (req, res, next) => {

    try {
        let results = await empresa.agregarTelefono(req.body.codigo, req.body.telefono, req.body.dependencia, req.body.tipo, req.body.wp);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/editarTelefono', async (req, res, next) => {

    try {
        let results = await empresa.editarTelefono(req.body.idTelefono, req.body.telefono, req.body.dependencia, req.body.tipo, req.body.wp);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/borrarTelefono', async (req, res, next) => {

    try {
        let results = await empresa.borrarTelefono(req.body.idTelefono);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/agregarRed', async (req, res, next) => {

    try {
        let results = await empresa.agregarRed(req.body.codigo, req.body.red, req.body.usuarioRed);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/borrarRed', async (req, res, next) => {

    try {
        let results = await empresa.borrarRed(req.body.idRed);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

//_______________________________________ REDES _________________________________________




router.get('/tiposRedes', async (req, res, next) => {

    try {
        let results = await redes.tipoRedes();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


//_______________________________________ Horarios _________________________________________




router.get('/tiposHorarios', async (req, res, next) => {

    try {
        let results = await horarios.tipoHorarios();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/agregarJornadaDividida', async (req, res, next) => {

    try {
        let results = await empresa.agregarJornadaDividida(req.body.codigo, req.body.tipoHorario, req.body.mananaDe, req.body.mananaA, req.body.tardeDe, req.body.tardeA);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/agregarJornadaContinua', async (req, res, next) => {

    try {
        let results = await empresa.agregarJornadaContinua(req.body.codigo, req.body.tipoHorario, req.body.continuaDe, req.body.continuaA);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/borrarHorario', async (req, res, next) => {

    try {
        let results = await empresa.borrarHorario(req.body.idHorario);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


router.post('/empresas/registro/updateInformacionAdicional', async (req, res, next) => {

    try {
        let results = await empresa.updateInformacionAdicional(req.body.codigo, req.body.categoria, req.body.domicilio, req.body.costoDomicilio, req.body.VCHoras, req.body.datafono, req.body.transferenciaBancolombia, req.body.transferenciaDavivienda, req.body.domicilioCovid, req.body.tags);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

//_______________________________________ CUPONES _________________________________________


router.get('/cupones/:cupon', async (req, res, next) => {

    try {
        let results = await cuponMako.cupones(req.params.cupon);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


//_______________________________________ IMPORTS _________________________________________
router.post('/empresas/registro/addMunicipio', async (req, res, next) => {
    console.log("entraaaa")
    try {
        let results = await AuxiImports.addMunicipio(req.body.id, req.body.nombre, req.body.codDep,);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/empresas/registro/addDepartamento', async (req, res, next) => {
    console.log("entraaaa")
    try {
        let results = await AuxiImports.addDepartamento(req.body.id, req.body.codigo, req.body.nombre,);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});



module.exports = router;