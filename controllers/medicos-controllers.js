//(123) Aqui se encuentran las funciones que dicen lo que hace cada una de estas rutas
const response = require ('express');

const Medicomodelo = require('../models/medico.model'); // (106) importamos el modelo para crear un nuevo medico



//*(122) GET Funcion de VER todos los MEDICOS PROMESAA -> AWAIT
const getMedicos = async (req,res = response)=>{

    /* const medicos = await Medicomodelo.find(); */ // lo sacamos todo
    const medicos = await Medicomodelo.find({},'nombre img')
                                            .populate('usuario','nombre email') // es un filtro para sacar los campos que nos interesen de usuario
                                            .populate('hospital','nombre') // es un filtro para sacar los campos que nos interesen de hosptial
    
    res.json({
        ok:true,
        medicos,
       /*  msg: 'Ver todos los medicos' */
    })
}

//*(230) GET Funcion de VER un medico por su ID los MEDICO PROMESAA -> AWAIT
const getMedicoPorId = async (req,res = response)=>{

    const medicoID= req.params.id; //obtener el id del medico

    try {

        const medico = await Medicomodelo.findById(medicoID)
                                            .populate('usuario','nombre email') // es un filtro para sacar los campos que nos interesen de usuario
                                            .populate('hospital','nombre') // es un filtro para sacar los campos que nos interesen de hosptial
    
    res.json({
        ok:true,
        medico
       /*  msg: 'Ver todos los medicos' */
    })
        
    } catch (error) {
        res.json({
            ok:false,
            msg:'Medico no encontrado'
        })
        
    }

}



//*(122) POST Funcion de CREACION de MEDICOS PROMESAA -> AWAIT
const crearMedico = async (req,res = response)=>{


    //(125) 7.07 min Necesito el usuarioId para hacer el guardado del medico
    const uid = req.uid;

    // Al crear el nuevo medico le paso el usuarioId y todos los parametros con el req.body
    const medico = new Medicomodelo({
        usuario:uid,
        ...req.body // tots los campos que tengo
    });

    try {

         //*guardo medico
        const medicoDB =  await medico.save();// lo guarda en la base de datos es una promesa y tengo que poner el asyc y el await
 
            res.json({
                ok:true,
                medico:medicoDB,
                msg:'Medico añadido', 
            });  

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al añadir medico a la DB'
        })
        
    }
       /*  //*guardo medico
     const medicoDB =  await medico.save();// lo guarda en la base de datos es una promesa y tengo que poner el asyc y el await
 
         res.json({
             ok:true,
             medico:medicoDB,
             msg:'Medico añadido', 
         });   */
}

//*(122) PUT Funcion de ACTUALIZAR  MEDICOS PROMESAA -> AWAIT
const actualizarMedico = async (req,res = response)=>{


    const medicoID= req.params.id; //obtener el id del medico

    try {

        const medico = await Medicomodelo.findById(medicoID);

        if (!medico) {
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado',  
            });  
        }

        const medicoCambios ={
            ...req.body // tot lo que esta en el body
        }

        const medicoActualizado = await Medicomodelo.findByIdAndUpdate(medicoID,medicoCambios,{new:true});

                res.json({
                    ok:true,
                    msg:'Medico actualizado',
                    medicoActualizado  
                }); 
                
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Medico no Actualizado!'
        })
        
    }







          
}
//*(122) DELETE Funcion de BORRAR  MEDICOS PROMESAA -> AWAIT
const borrarMedico = async (req,res = response)=>{

    const medicoID= req.params.id; //obtener el id del medico

    try {

        const medico = await Medicomodelo.findById(medicoID);


        if (!medico) {
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado',
                 
            });     
        }

        const medicoBorrado = await Medicomodelo.findByIdAndRemove(medicoID,{new:true});

        res.json({
            ok:true,
            msg:'Medico borrado',
            medicoBorrado
              
        });
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Medico no Borrado!'
        })
    }


     
}


// EXPORTAMOS LAS FUNCIONES A MEDICOS.ROUTES Y DE AHI A INDEX.JS
module.exports = {
                getMedicos,
                crearMedico,
                actualizarMedico,
                borrarMedico,
                getMedicoPorId
                }