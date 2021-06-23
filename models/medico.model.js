
// *(123) Sera un modelo de mongoose para poner ciertas restricciones a que cada registro de medicos siga un modelo
//* De foma automatica mongoose creara la base de datos en mongoDB
const {Schema,model} = require('mongoose'); // importaciones necesarias para el modelo de MEDICO


//tabla de Medico
const MedicoShema = Schema({

    nombre:{
        type:String,
        required:true
    },

    img:{
        type:String,
    },

    //* 4.22 min Que usuario creó el medico, necesitamos la clave ajena de usuario y de hospital
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario', // tal y como esta exportado en usuario.model
        required:true,  // lo quitamos para que no de fallo al añadir medicos a la bd
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital', // tal y como esta exportado en hospital.model
         required:true,  //lo quitamos para que no de fallo al añadir medicos a la bd
    }


},{collection:'medicos'}); // (122) 5.20 min para cambiarle el nombre de la coleccion en la bd 

//(107) para cambiar la forma en la que obtenemos el _id de los usuarios
//(112) Ponemos el password tambiem para que no se muestre ademas que esta encriptado
MedicoShema.method('toJSON',function(){
    const {__v, ...object}  =  this.toObject();
    return object;
});

//implementamos el modelo y lo exportamos dandole un nombre y diciendo el tipo de esquema que tienen los datos
module.exports = model('Medico',MedicoShema);

// 1 nos creamos la ruta en index.js
// 2 creamos los diferentes rutas en medicos.routes.js
// 3 definios lo que hace cada ruta en medicos-constrollers.js