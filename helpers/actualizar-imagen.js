
const response = require ('express');
const UsuarioModelo = require('../models/usuario.model');
const HospitalModelo = require('../models/hospital.model');
const MedicoModelo = require('../models/medico.model');

const fs = require('fs');//(134) 7.28 min Filesystem, puedo leer las carpetas y los archivos y ver que contienen



const actualizarImagen = async ( escritoTabla, id ,nombreArchivo )=> {

    switch (escritoTabla) {

        case 'medicos':

            const medico = await MedicoModelo.findById(id); // BUscarmos medico por su ID

             if (!medico) {
                console.log('El id de este medico no existe')
                return false; 
            }

            const pathViejo= `./uploads/medicos/${medico.img}`;

           /*  console.log(fs.existsSync(pathViejo));
            console.log(pathViejo); */

            // Vemos si existe
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo, (error) => {
                  console.log(error);
                });
              } 

            medico.img = nombreArchivo;
           
                 //guardar medico
           await medico.save();

           
        break;

        case 'hospitales':

            const hospital = await HospitalModelo.findById(id); // BUscarmos hospital por su ID

            if (!hospital) {
               console.log('El id de este hospital no existe')
               return false; 
           }

           const pathViejo1= `./uploads/hospitales/${hospital.img}`;

           /* console.log(fs.existsSync(pathViejo));
           console.log(pathViejo); */

           // Vemos si existe
           if (fs.existsSync(pathViejo1)) {
               fs.unlinkSync(pathViejo1, (error) => {
                 console.log(error);
               });
             } 

           hospital.img = nombreArchivo;
          
                //guardar hospital
          await hospital.save();

        break;

        case 'usuarios':

            const usuario = await UsuarioModelo.findById(id); // BUscarmos usuario por su ID

            if (!usuario) {
               console.log('El id de este usuario no existe')
               return false; 
           }

           const pathViejo2= `./uploads/usuarios/${usuario.img}`;

           /* console.log(fs.existsSync(pathViejo2));
           console.log(pathViejo2); */

           // Vemos si existe
           if (fs.existsSync(pathViejo2)) {
               fs.unlinkSync(pathViejo2, (error) => {
                 console.log(error);
               });
             } 

           usuario.img = nombreArchivo;
          
                //guardar usuario
          await usuario.save();

            
        break;

        default:
            break;
    }

}




//Exportamos la funcion
module.exports ={actualizarImagen}