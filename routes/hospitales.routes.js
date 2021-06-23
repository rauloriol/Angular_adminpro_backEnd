//*(122) Creamos las rutas para el api de HOSPITALES
/************************* 
    Ruta: /api/hospitales
**************************/

const {Router} = require('express');
const {check} = require('express-validator'); // (109) para hacer VALIDACIONES

const {validarCampos} = require ('../middlewares/validar-campos'); //(110) middleware que devuelve el resultado del los validadroes
const { validarJWT } = require('../middlewares/validar-jwt'); // (117) para validar el jwt

// (122)importamos las funciones que estan en el controllers
 const {getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital} = require('../controllers/hospitales-controllers');


const router = Router();

router.get('/',getHospitales);

router.post('/',
            [
            validarJWT,
            check('nombre','El nombre del hospital es necesario').not().isEmpty(),
            validarCampos,
            ],
            crearHospital);

router.put('/:id',
            [    
            validarJWT,
            check('nombre','El nombre del hospital es necesario').not().isEmpty(),
            validarCampos,
            ],
                actualizarHospital);


router.delete('/:id',validarJWT,borrarHospital);






module.exports = router; //esto se exporta a index.js donde se llaman a las rutas