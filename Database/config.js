const mongoose = require('mongoose');


//usuario : rule_user
//constraseña : af34BxUUVFplyQqx

// (96)creamos una funcion que se encarge de establecer la conexion a la bd de mongo compass
// esta funcion con el async y await retorna una promesa es sincrono
const dbConexion = async()=>{

    try {
        // los datos de conexion estan en un archivo diferente .env
        await mongoose.connect(process.env.DB_CONEXION_MONGOOSE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false,
        });

        console.log('Database is ONLINE!');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar conexion a Database mongoDB');
    }

}

// (96)exportamos la funcion de conexion fuera
module.exports = {
    dbConexion
}