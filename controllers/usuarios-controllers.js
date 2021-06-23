
/*
 (105) Aqui se encuentra la logica (las funciones) de cada una de mis rutas 8.11 min
*/

//(105) 6.40 min Solo voy a hacer funciones que yo voy a exportar, es este caso es el req de usuarios routes

const response = require ('express');
const bcrypt = require ('bcryptjs'); // (111) ecryptar contraseñas

const Usuariomodelo = require('../models/usuario.model'); // (106) importamos el modelo para crear un nuevo usuario

const {generarJWT} =  require('../helpers/jwt');//(116) para importar los token
 


    //*(105) GET Funcion de ver todos los Usuarios PROMESAA -> AWAIT
     const getUsuarios = async (req,res)=>{

        // (128) 3.46 min Para hacer una PAGINACION en NODE si no tengo valor del parametro desde que sea cero
        const desde = Number(req.query.desde) || 0;
        /* console.log(desde); */

        /* const usuarios = await Usuariomodelo.find(); */ // lo sacamos todo
        /* const usuarios = await Usuariomodelo.find({},'nombre email rol google',); 
 */
        //* UNA FORMA DE HACERLO
        /* const usuarios = await Usuariomodelo
                                .find({},'nombre email rol google',) // es un filtro para sacar los campos que nos interesen
                                .skip(desde) //(128) 5.02 min Paginacion, SKip salta todos los registros antes del desde
                                .limit(5) //(128) 5.48 min desde el SKip cuantos registros muestra, en este caso +5 mas

        const totalUsuarios= await Usuariomodelo.count(); // Cuantos usuarios tenemos en el registro */

        //* OTRA FORMA DE HACERLO
        //*(128) Con PromiseAll se ejecutan todas las promesas de golpe, es una coleccion de promesas
        const [usuarios,totalUsuarios ] = await Promise.all([

            Usuariomodelo
            .find({},'nombre email rol google img',) // es un filtro para sacar los campos que nos interesen
            .skip(desde) //(128) 5.02 min Paginacion, SKip salta todos los registros antes del desde
            .limit(5), //(128) 5.48 min desde el SKip cuantos registros muestra, en este caso +5 mas

            Usuariomodelo.count() // Cuantos usuarios tenemos en el registro

        ]);


        res.json({
            ok:true,
            usuarios,
            totalUsuarios
           /*  msg: 'Ver todos los usuarios' */
        })
    }

    //*(106) POST Funcion de creacion de Usuarios PROMESAA -> AWAIT
    const crearUsuario = async (req,res = response)=>{

        /* console.log(req.body); */
        const {email,password}= req.body;

    
        try {

            // UNA VALIDACION PARA NO REPETIR EL CORREO (108) 2.28 min
            const existeEmail =  await Usuariomodelo.findOne({email}); // Es una promesa por tanto await y de los email

            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'El correo ya esta registrado'
                })
            }

            const usuario = new Usuariomodelo (req.body);


            // *(111) Encriptar contraseña con un salt (un dato creado de forma aleatoria)
             const salt = bcrypt.genSaltSync();
             usuario.password= bcrypt.hashSync(password,salt);



            //*guardo usuario
            await usuario.save();// lo guarda en la base de datos es una promesa y tengo que poner el asyc y el await


            //**  (116) **Generar el token -jwt Autentificacion pasiva  JWT.io
            //lo importamos de Helpers jwt y es una promsea por lo que utilizamos el await para esperar que se genere, una vez generado
            const tokengenerado = await generarJWT(usuario.id);

             res.json({
                 ok:true,
                 msg:'Usuario añadido',
                 usuario,
                 tokengenerado
             })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error inesperado, revisar logs'
            });
        }
    
    }


    //*(112) PUT Actualizar un usuario existente  es una PROMESA
    const actualizarUsuario = async (req,res = response) =>{

        // Todo Valiadar token y ver si el usuario es correcto
        const usuarioId = req.params.id; // obtengo el id del usuario en la BD es id pq esta en usuarios.routes linea 36
        /* const { nombre,email,rol} = req.body; */
        
        try {
             const usuarioDB = await Usuariomodelo.findById(usuarioId); // busca el usuario por su id

            //validacion previa
            if (!usuarioDB) {
                return res.status(404).json({
                    ok:false,
                    msg:'No existe un usuario con el ID indicado'
                });
            }
            // El usuario d la bd si que existe
            //Actualizaciones
            const camposFormulario = req.body; // tots los campos de los formularios excepto
            delete camposFormulario.password;
            
                
            const usuarioActualizado = await Usuariomodelo.findByIdAndUpdate(usuarioId,camposFormulario,{new:true}); // es la query de actualizar 

            res.json({
                ok:true,
                usuario: usuarioActualizado
            });
            

        } 
        catch (error) {
            console.log(error);
            res.status().json({
                ok:false,
                msg:'Error al actualizar usuario'
            })
            
        }
    }

    //* (114) DELETE un usuario
    const borrarUsuario = async (req,res =response) =>{

        const usuarioId = req.params.id; // obtengo el id del usuario en la BD, el id es el nombre que tiene en la ruta

        try {

            const usuarioDB = await Usuariomodelo.findById(usuarioId); // busca el usuario por su id

            if (!usuarioDB) {
                return res.status(404).json({
                    ok:false,
                    msg:'No existe un usuario con el ID indicado'
                });
            }

            const usuarioBorrado = await Usuariomodelo.findByIdAndDelete(usuarioId); // es la query de actualizar 

            res.json({
                ok:true,
                msg:'Usuario eliminado de la BD',
                /* usuarioBorrado */
            });

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error al borrar usuario'
            })
            
        }
    }




    // EXPORTAMOS LAS FUNCIONES A USUARIOS.ROUTES Y DE AHI A INDEX.JS
    module.exports = {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario}