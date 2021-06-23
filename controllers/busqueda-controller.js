


const {response }= require ('express');

//(130) Busqueda en todas la colecciones
const Usuariomodelo = require('../models/usuario.model'); // (106) importamos el modelo para buscar usuarios
const Hospitalmodelo = require('../models/hospital.model'); // (106) importamos el modelo para buscar hospital
const Medicomodelo = require('../models/medico.model'); // (106) importamos el modelo para crear un nuevo medico






 //*(129) GET Funcion de ver todas las coincidencias PROMESAA -> AWAIT
 const getbusqueda = async (req,res = response )=>{

    // para ver lo que hemos escrito (6.57 min)
    const escritoBusqueda = req.params.busqueda;
    // para una busqueda insensible, que aunque no coincida al 100% lo saque
    const regexBusqueda= new RegExp(escritoBusqueda,'i'); // con 'i' le da igual es un tipo de bandera


    //* PRIMERA FORMA
    //para buscar en coleccion Usuarios
    /* const usuarios = await Usuariomodelo.find({nombre: escritoBusqueda}); //(130) 2.45 min buscamos por el nombre en la coleccion */
    /* const usuarios = await Usuariomodelo.find({nombre: regexBusqueda}); */ //(130) 2.45 min buscamos por el nombre en la coleccion
    //para buscar en coleccion Medicos
    /* const medicos = await Medicomodelo.find({nombre: regexBusqueda}); */ //(130) 2.45 min buscamos por el nombre en la coleccion
    //Para buscaar en coleccion Hospitales
    /* const hospitales = await Hospitalmodelo.find({nombre: regexBusqueda});  *///(130) 2.45 min buscamos por el nombre en la coleccion


    //* SEGUNDA FORMA  7.23 min ->Para una busqueda de todas las promesas a la vez..

    const [usuarios,medicos,hospitales] = await Promise.all([

         Usuariomodelo.find({nombre: regexBusqueda}),
         Medicomodelo.find({nombre: regexBusqueda}),
         Hospitalmodelo.find({nombre: regexBusqueda})
    ])

    
    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
       /*  escritoEnBusqueda: escritoBusqueda */
        
    });
}

//*(131) GET Funcion de ver todas las coincidencias de una COLECCION EN ESPECIFICO PROMESAA -> AWAIT
const getdocumentoscoleccion = async (req,res = response )=>{

    // para ver lo que hemos escrito en la tabla y dentro de la tabla(coleccion) la busqueda  (6.57 min)
    const escritoTabla = req.params.tabla; // TABLA viene de la ruta que esta en busqeuda.routes
    const escritoBusqueda = req.params.busqueda; // BUSQUEDA viene de la ruta que esta en busqueda.routes
    
    const regexBusqueda= new RegExp(escritoBusqueda,'i'); // con 'i' le da igual es un tipo de bandera

    let datos= [];


    switch (escritoTabla) {

        case 'usuarios':

         datos = await Usuariomodelo.find({nombre: regexBusqueda});
        break;
    
        case 'hospitales':
            datos = await Hospitalmodelo.find({nombre: regexBusqueda})
                                        .populate('usuario','nombre img'); 
        break;

        case 'medicos':

            datos = await Medicomodelo.find({nombre: regexBusqueda})
                                        .populate('usuario','nombre img')
                                        .populate('hospital','nombre');  
        break;

        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser /coleccion/usuarios/busqueda,  /coleccion/medicos/busqueda,  /coleccion/hospitales/busqueda'
            })
            break;
    
    }// fin del switch case

    // NOS DEVUELVE LA RESPUESTA DE LOS DATOS
    res.json({
        ok:true,
        resultado: datos
    });
        
}


// EXPORTAMOS LAS FUNCIONES A BUSQUEDA.ROUTES Y DE AHI A INDEX.JS
module.exports = {getbusqueda,getdocumentoscoleccion}