//*(132) Creamos las rutas para el api de SUBIDAS

/************************* 
    Ruta: /api/upload/tabla/id
**************************/


const {Router} = require('express');

const expressfileUpload = require('express-fileupload'); //(132) 9.01 min para subir archivos

const { validarJWT } = require('../middlewares/validar-jwt'); // (117) para validar el jwt
const { uploadFile, devolverImagen } = require('../controllers/subidas-controller');


const router = Router();

router.use(expressfileUpload()); // /(132) 9.32 min ejecutamos el middleware


router.put('/:tabla/:id',validarJWT,uploadFile); 
router.get('/:tabla/:foto',devolverImagen);  //(137) para obtener imagenes


//exportamos los datos
module.exports = router; //esto se exporta a index.js donde se llaman a las rutas