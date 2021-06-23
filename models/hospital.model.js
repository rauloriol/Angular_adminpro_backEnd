
// *(122) Sera un modelo de mongoose para poner ciertas restricciones a que cada registro de hospitales siga un modelo
//* De foma automatica mongoose creara la base de datos en mongoDB
const {Schema,model} = require('mongoose'); // importaciones necesarias para el modelo de HOSPITAL


//tabla de hospital
const HospitalShema = Schema({


    nombre:{
        type:String,
        required:true
    },

    img:{
        type:String,
    },

    //* 4.22 min Que usuario creó el hospital, necesitamos la clave ajena de usuario
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario', // tal y como esta exportado en usuario.model
        required:true,  // desactivdado por que da problemas a la hora de añadir un nuevo hospital
    }


},{collection:'hospitales'}); // (122) 5.20 min para cambiarle el nombre de la coleccion en la bd 

//(107) para cambiar la forma en la que obtenemos el _id de los usuarios
//(112) Ponemos el password tambiem para que no se muestre ademas que esta encriptado
HospitalShema.method('toJSON',function(){
    const {__v,_id, ...object}  =  this.toObject();
    object.hospitalId = _id;
    return object;
});

//implementamos el modelo y lo exportamos dandole un nombre y diciendo el tipo de esquema que tienen los datos
module.exports = model('Hospital',HospitalShema);

// 1 nos creamos la ruta en index.js
// 2 creamos los diferentes rutas en hospital.rotues.js
// 3 definios lo que hace cada ruta en hospitales-constrollers.js