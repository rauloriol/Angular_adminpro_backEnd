//(115) 2.54min
const response = require ('express');
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {generarJWT} =  require('../helpers/jwt');                //(116) para importar los token
const {googleVerify} = require('../helpers/google-verify');     // (145) Se importa del helper
const {getMenuFrontEnd} = require('../helpers/menu-frontEnd')   //(240) Se importa para que se carge el menu



const loginUsuario = async(req,res = response) =>{

    const {email,password}= req.body; // (115) 6.31min sacamso el emmail y el password del body

    try {
         //Verificar email
        const usuarioDB = await usuarioModel.findOne({email}); // busco si existe ese email en la BD

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Correo no valido!'
            })
            
        }

         //* 10.14 min Verificar constraseña comparando la contraseña introducida con la guardada en la base de datos
        const validPassword = bcrypt.compareSync(password,usuarioDB.password); // devuelve un boolean

    if (!validPassword) {
        return res.status(400).json({
            ok:false,
            msg:'Contraseña inválida'
        })
           
       }

        
       //**  (116) **Generar el token -jwt Autentificacion pasiva  JWT.io
       //lo importamos de Helpers jwt y es una promsea por lo que utilizamos el await para esperar que se genere, una vez generado
       const token = await generarJWT(usuarioDB.id);

    
        res.json({
            ok:true,
            token,
            menu:getMenuFrontEnd(usuarioDB.rol),           // gestion del menu en backENd
            msg:'login correcto!!'
        });



    }
     catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el login del Usuario'
        })
        
    }

}

//(152) 2.42 min
const renewToken = async (req,res= response)=>{

    try {
        const uid= req.uid; // tomamos el uid del usuario

        // Generar el TOKEN _JWT
        const token = await generarJWT(uid);
    
        // (181) Obtener el usuario por UID
        const usuario = await usuarioModel.findById(uid);
    
        res.json({
            ok:true,
            token,
            usuario,
            menu:getMenuFrontEnd(usuario.rol),           // gestion del menu en backENd
            
        });
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token no renovado'
            
        });
    }


   
}

// (145)Validacion con google
const googleLogin = async(req,res = response)=>{

    const googleToken = req.body.token; // tomar el token de la peticion 
    /* console.log(googleToken); */ // ver token de google


    try {

        const {name,email,picture}  =  await googleVerify(googleToken); // desestrucutramos para sacar lo que nos interes
        
        // (145) VALIDACIONES para el login de google 

        // Buscar el usuario en la BD
        const usuarioDb = await usuarioModel.findOne({email});
        var usuario;

        // (145) si no existe USUARIO  crear uno nuevo
        if (!usuarioDb) {
            usuario = new usuarioModel({
                nombre: name,
                email,
                password:'@@@@',
                img: picture,
                google: true
            })  
        }else{
            usuario = usuarioDb; // (145) que conocemos todos sus datos
            
            
        }
        
        // (145) GUARDAR EN BD el usuario nuevo o si ya esta login no hacemos nada
        await usuario.save((err,usuarioDb)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al guardar el usuario',
                    errors: err
                });
            }

        });

        // (145) Generar el TOKEN _JWT
         var token = await generarJWT(usuario.id); 
        
                res.json({
                    ok:true,
                    msg:'Login con google -> OK!',
                    /* name , email ,picture, */ 
                    token,
                    menu:getMenuFrontEnd(usuario.rol)     // (240) gestion del menu en backend
                    
                })
        
    } catch (error) {
        
        res.status(401).json({
            ok:false,
            msg:'Token google no es correcto'
            
        });
    }
}





// EXPORTAMOS LAS FUNCIONES A AUTH.ROUTES Y DE AHI A INDEX.JS
module.exports = {loginUsuario, renewToken, googleLogin}