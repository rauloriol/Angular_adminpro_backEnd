//*(122) Creamos las rutas para el api de MEDICOS
/************************* 
    Ruta: /api/medicos
**************************/

const {Router} = require('express');
const {check} = require('express-validator'); // (109) para hacer VALIDACIONES

const {validarCampos} = require ('../middlewares/validar-campos'); //(110) middleware que devuelve el resultado del los validadroes
const { validarJWT } = require('../middlewares/validar-jwt'); // (117) para validar el jwt

// (122)importamos las funciones que estan en el controllers
 const {getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoPorId} = require('../controllers/medicos-controllers');


const router = Router();

router.get('/',validarJWT,getMedicos);

router.get('/:id',validarJWT,getMedicoPorId);              // Obtener medico por su ID



router.post('/',[
                validarJWT,
                check('nombre','El nombre del Médico es necesario').not().isEmpty(),
                check('hospital','El hospital id debe de ser válido').isMongoId(), // (126) 1.54 min
                validarCampos,
                ]
                ,crearMedico);


router.put('/:id',
                [
                validarJWT,
                check('nombre','El nombre del medico es necesario').not().isEmpty(),
                check('hospital','El hospital id debe de ser válido').isMongoId(), // (126) 1.54 min
                validarCampos
                ]
                ,
                actualizarMedico);



router.delete('/:id',validarJWT,borrarMedico);



module.exports = router; //esto se exporta a index.js donde se llaman a las rutas