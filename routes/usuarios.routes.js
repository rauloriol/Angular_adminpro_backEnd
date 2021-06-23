//*(105) Creamos las rutas para el api de USUARIOS
/************************* 
    Ruta: /api/usuarios
**************************/

const {Router} = require('express');
const {check} = require('express-validator'); // (109) para hacer VALIDACIONES
 

const {getUsuarios,crearUsuario,actualizarUsuario, borrarUsuario} = require ('../controllers/usuarios-controllers');
const {validarCampos} = require ('../middlewares/validar-campos'); //(110) middleware que devuelve el resultado del los validadroes
const { validarJWT } = require('../middlewares/validar-jwt'); // (117) para validar el jwt
const { validarADMIN_ROLE } = require('../middlewares/validar-jwt'); // (117) para validar si es el admin
const { validarADMIN_ROLE_MISMO_USER } = require('../middlewares/validar-jwt'); // (117) para validar si es el admin o el mismo usuario registrado



const router = Router();

router.get( '/',validarJWT,validarADMIN_ROLE,getUsuarios); // (105) 7.53 min  lo llamo de usuarios-controller la funcion de ver usuarios tb le añado el middleware para el jwt

//(109) Colocamos varios middlewares que actuaran como VALIDADORES para la introduccion de datos del formulario
// una vez se cumplen los middlewares ya se crea el nuevo usuario
router.post( 
    '/',
        [
        check('nombre','El nommbre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('email','El email es oblitorio').isEmail(),
        validarCampos // (110) este metodo se llama al final par que nos de un reporte de los fallos al crear nuevo usuario
        ]
        ,crearUsuario); // (106) Creacion de nuevo usuario



    //(112) Modificar usuarios
router.put(
        '/:id',
        [
            validarJWT,
            validarADMIN_ROLE_MISMO_USER,
            check('nombre','El nommbre es obligatorio').not().isEmpty(),
            check('email','El email es oblitorio').isEmail(),
            check('rol','El rol es obligatorio').not().isEmpty(),
            validarCampos    
        ]
        ,actualizarUsuario);

        //(114) borramos un usuario segun su id 
router.delete('/:id',validarJWT,validarADMIN_ROLE,borrarUsuario); 


//exportamos los datos
module.exports = router; //esto se exporta a index.js donde se llaman a las rutas