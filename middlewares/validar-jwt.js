
//(117) UNA vez generado los token lo que hacemos es utilizarlos para varias rutas, de esta forma,
// solo usuarios ya logueados podran ver a otros usuarios y podran acceder a diferntes partes de nuestra aplicacion



// 3.06 min Como cualquier middleware son como == controladores, pero tienen el metodo (NEXT)
// next es la funcion que tengo que llamar cuando todo sale correctamente

const jwt = require('jsonwebtoken'); //importacion deL JWT
const Usuario = require('../models/usuario.model')




//funcionn para validar el json web token
const validarJWT = (req,res,next)=> {

    //leer el token
    const token = req.header('x-token'); // para tomar los datos de headers->key de postman

    //VALIDACIONES
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
        
    }
    //6.08 min  Verificar el JWT si es valido o no, utilizamos try y cath
    try {

        const {uid} = jwt.verify(token,process.env.JWT_secret);

         /* console.log(uid); */  // SI llega hasta aqui el token es correcto  */
        req.uid=uid;

        //TOT OK! se hace el next
        next(); 
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token invalido'
        })
        
    }
    /* console.log(token); */
}


// (243) Para validar el rol de admin --> lo implementasmos en las rutas que quiero proteger
const validarADMIN_ROLE = async (req,res,next)=> {

    const uid = req.uid;                    // tomar el uid del user

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
             return res.status(404).json({
                 ok:false,
                 msg:'Usuario no existe'
             })
            
        }

        if (usuarioDB.rol !=='ADMIN_ROLE') {
            return res.status(404).json({
                ok:false,
                msg:'No tienes suficientes privilegios'
            })
            
        }
        next();         // si logra pasar todo se aplica el next

        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error en validacion'
        })
        
    }


}


const validarADMIN_ROLE_MISMO_USER= async (req,res,next)=> {

    const uid = req.uid;                    // tomar el uid del user
    const id = req.params.id;                //*(244) tomar el id de la ruta de busqueda -->http://localhost:4001/api/usuarios/5f3179a3e2aa6e046eba4d9e
                                            // *(244) es el que quiero actualizar
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
             return res.status(404).json({
                 ok:false,
                 msg:'Usuario no existe'
             })
            
        }
                                                //* (244) si  uid!==id es diferente usuario que quiere actualizarse no podras
        if (usuarioDB.rol !=='ADMIN_ROLE' && uid!==id) {
            return res.status(404).json({
                ok:false,
                msg:'No tienes suficientes privilegios'
            })
            
        }
        next();         // si logra pasar todo se aplica el next ya que sera un admin o el mismo usuario

        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error en validacion'
        })
        
    }


}


// lo exportamos a rutas--> Usuarios.routes--> metodo get, put, delete como middleware para que no puedas hacer nada de eso si no estas loguing
// (243) __> se exporta a rutas-> Usuaruios.rotues _> para que si no eres admin no puedas hacer el crud
// (244) __> se exporta a rutas-> Usuaruios.rotues _> PUT para que si no eres admin o el mismo usuario no puedas actualizar a otro

module.exports= {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_MISMO_USER}