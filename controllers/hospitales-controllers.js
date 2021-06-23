
//(122) Aqui se encuentran las funciones que dicen lo que hace cada una de estas rutas
const response = require ('express');

const Hospitalmodelo = require('../models/hospital.model'); // (106) importamos el modelo para crear un nuevo hospital



//*(122) GET Funcion de VER todos los HOSPITALES PROMESAA -> AWAIT
const getHospitales = async (req,res = response)=>{

    /* const hospitales = await Hospitalmodelo.find(); */ // lo sacamos todo
    const hospitales = await Hospitalmodelo.find().populate('usuario','nombre email img') // es un filtro para sacar los campos que nos interesen del Model path usuario en este caso el nombre que lo creo y su imagen

    res.json({
        ok:true,
        hospitales,
       /*  msg: 'Ver todos los hospitales' */
    })
}

//*(122) POST Funcion de CREACION de HOSPITALES PROMESAA -> AWAIT
const crearHospital = async (req,res = response)=>{

    /* const hospital = new Hospitalmodelo(req.body); */
     //(124) 7.07 min Necesito el usuarioId para hacer el guardado del hospital y esto lo tengo en el req.body
    const uid = req.uid;
    /* console.log(uid);  */

    // Al crear el nuevo hospital le paso el usuarioId y todos los parametros con el req.body
    const hospital = new Hospitalmodelo({
        usuario:uid,  // el campo de usuarioId
        ...req.body }); //(124) tots los campos que tengo

    
        try {
            //*guardo hospital
        const hospitalDB =  await hospital.save();//(124) lo guarda en la base de datos es una promesa y tengo que poner el asyc y el await

            res.json({
                ok:true,
                msg:'Hospital añadido',
                hospital:hospitalDB 
            });  

        } catch (error) {
            res.status(500).json({
                ok:false,
                msg:'Error al añadir hospital a la DB'
            });
            
        }

}


//*(122) PUT Funcion de ACTUALIZAR  HOSPITALES PROMESAA -> AWAIT
//*(153) Actualizar el hospital
const actualizarHospital = async (req,res = response)=>{

    const hospitalID= req.params.id; //obtener el id del hospital


    try {
        
        const hospital = await Hospitalmodelo.findById(hospitalID);


        if (!hospital) {
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado',
                 
            });  
            
        }
        /* hospital.nombre=req.body.nombre; */ // UNA FORMA DE HACERLO
        // OTRA FORMA DE ACTUALIZARLO
        const hospitalCambios ={
            ...req.body // tot lo que esta en el body
        }

        const hospitalActualizado = await Hospitalmodelo.findByIdAndUpdate(hospitalID,hospitalCambios,{new:true});


        res.json({
            ok:true,
            msg:'Hospital actualizado',
            HospitalActualizado:hospitalActualizado  
        });  

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hospital no Actualizado!'
        })
        
    }

}

//*(122) DELETE Funcion de BORRAR  HOSPITALES PROMESAA -> AWAIT
//*(154) BORRAR el hospital
const borrarHospital = async (req,res = response)=>{

    const hospitalID= req.params.id; //obtener el id del hospital

    try {

        const hospital = await Hospitalmodelo.findById(hospitalID);


        if (!hospital) {
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado',
                 
            });     
        }

        const hospitalBorrado = await Hospitalmodelo.findByIdAndRemove(hospitalID,{new:true});

        res.json({
            ok:true,
            msg:'Hospital borrado',
            hospitalBorrado
              
        });
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hospital no Borrado!'
        })
    }
 
}


// EXPORTAMOS LAS FUNCIONES A HOSPITALES.ROUTES Y DE AHI A INDEX.JS
module.exports = {
                getHospitales,
                crearHospital,
                actualizarHospital,
                borrarHospital}