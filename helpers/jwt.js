/****************************
         JWT desde JWt.io
 **************************/ 
        
       //**  (116) **Generar el token -jwt Autentificacion pasiva  JWT.io
       // el token es un string que va a ser enviado al backend y es el backend quien verifica si el token esta activo,
       // y si ha sido creado por le mismo usuario--> si el token es correcto hacemos lo que queramos
       // tiene tres partes HEADER PAYLOAD Y SIGNATURE
       // Lo que almacenamos en el payload no tiene q ser info sensible por que se puede ver desde el cliente poner solo
       // el usuarioID por ejemplo eso si,pero no las contraseñas
       //en la firma esta la pregunta secreta que firma los tokens, guardarla bien
       // Se puede poner fecha de caducidad si se quiere


       const jwt = require('jsonwebtoken'); //(116) importacion y instalacion del modulo npm install jsonwebtoken


       const generarJWT = (uid)=>{
 

        // 8.31 lo transformo en una promesa  para tener disponible un RESOLVE Y un REJECT dentro del callback
        return new Promise((resolve,reject)=>{

            // COMO CUERPO DE LA PROMESA
            const payload = {
                uid,
                /* nombre:'nombre de la persona',
                   rol:'Adminstrador',  
                */
            }
    
            // Firmamos el JWT con la palabra secreta que esta guardada en nuestro archivo, tiempo de duracion y el callback
            jwt.sign(
                payload,
                process.env.JWT_secret,
                {expiresIn:'72h'},
                (err,token)=>{
    
                    if (err) {
                        console.log(err);
                        // si hay un error..
                        reject('NO se generó el JWT'); 
                    }
                    else{
                        resolve(token); // si todo funciona bien nos devuelve el token en forma de PROMESA
                    }
                });
             
        });
       }

       // PARA PODER EXPORTARLO como objeto
       module.exports = {generarJWT}