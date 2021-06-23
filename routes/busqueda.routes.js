//*(129) Creamos las rutas para el api de BUSQUEDA
/************************* 
    Ruta: /api/buscador
**************************/
/************************* 
    Ruta: /api/coleccion/tabla/buscador
**************************/


const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt'); // (117) para validar el jwt
const { getbusqueda, getdocumentoscoleccion } = require('../controllers/busqueda-controller'); //(129 )Importamos del controlador


const router = Router();

router.get('/:busqueda',validarJWT,getbusqueda);
router.get('/coleccion/:tabla/:busqueda',validarJWT,getdocumentoscoleccion); // (131) 0.56 min una nueva ruta para buscar coleccion por coleccion


//exportamos los datos
module.exports = router; //esto se exporta a index.js donde se llaman a las rutas