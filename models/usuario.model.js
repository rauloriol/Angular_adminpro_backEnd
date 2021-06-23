// *(104) Sera un modelo de mongoose para poner ciertas restricciones a que cada registro de usuarios siga un modelo
//* De foma automatica mongoose creara la base de datos en mongoDB
const {Schema,model} = require('mongoose'); // importaciones necesarias para el modelo de USUARIO


//tabla de usuarios
const UsuarioShema = Schema({


    nombre:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    img:{
        type:String,
    },

    rol:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },

    google:{
        type:Boolean,
        default:false
    },
});

//(107) para cambiar la forma en la que obtenemos el _id de los usuarios
//(112) Ponemos el password tambiem para que no se muestre ademas que esta encriptado
UsuarioShema.method('toJSON',function(){
    const {__v, _id,password, ...object} =this.toObject();

    object.uid = _id; // cabiamos como se ve el id de los usuarios en la bd
    
    return object;
});

// (104) 5.32 min implementamos el modelo y lo exportamos dandole un nombre y diciendo el tipo de esquema que tienen los datos
module.exports = model('Usuario',UsuarioShema)