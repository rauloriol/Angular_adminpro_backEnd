//*(115) Creamos las rutas para el api de LOGIN
/************************* 
    Ruta: /api/login
**************************/

/************************* 
    Ruta: /api/login/renovarlogin
**************************/

/************************* 
    Ruta: /api/login/google
**************************/


const {Router} = require('express');
const {loginUsuario, renewToken, googleLogin} = require('../controllers/auth-controlller'); // importamos de controlleres
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt'); // (152) 2.15 min para validar el JWT

const router = Router();

// Utilizamos la validacion para que si no se rellenan los campos salga fallo en el post

router.post('/',
[
    check('email','El email es oblitorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
loginUsuario
);

//RENOVAR TOKEN (152) 1.54 min
router.get('/renovarlogin',
            validarJWT,
            renewToken
        );



    // (145) Login con google
router.post('/google',
    [
    check('token','El token de google es oblitorio').not().isEmpty(),
    validarCampos
    ],
    googleLogin
);



//exportamos los datos
module.exports = router; //esto se exporta a index.js donde se llaman a las rutas