
//(132) 3.30 min
const {response } = require ('express');
const uuid = require('uuid/v4');
const path = require('path'); // 137 2.43 min
const {actualizarImagen} = require('../helpers/actualizar-imagen') // (134) Actualizar la img de la BD
const filesystem = require('fs');//(137) 7.04 min Filesystem, puedo leer las carpetas y los archivos y ver que contienen


const uploadFile = async (req,res = response )=>{

    // para ver lo que hemos escrito en la tabla y dentro de la tabla(coleccion) el Id 
    const escritoTabla = req.params.tabla; //5.11 min TABLA viene de la ruta que esta en subidas.routes
    const id = req.params.id; // 5.11 min Id viene de la ruta que esta en subidas.routes

    // (132) 6.10 min Validar el tipo de tabla
    const tiposTablaValidos = ['hospitales','medicos','usuarios'];

    if (!tiposTablaValidos.includes(escritoTabla)) {
        return res.status(400).json({
            ok:false,
            msg:'No es medicos, usuarios  hospitales (tipo de tabla (coleccion))'
        })
        
    }
    //Validar que existe un archivo
    // Validacion de la pagina de  express-upload (https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No se ha subido ningún archivo'
        })
      }

    
    //* (133)Procesar la imagen de body form data ..

    //Con esto tengo el archivo
    const archivo = req.files.imagen; // imagen es el nombre de la propiedad en postman para subir la imagen (key)

      // (133) 1.43min Extraer la extension del archivo
      const nombreCortado = archivo.name.split('.'); // wolverine.1.2.png

      // para sacar la extension tomo el nombre cortado
      const extensionArchivo = nombreCortado[nombreCortado.length - 1 ];

      // Validar extension  2.30 min
      const extensionValidas = ['jpg','png','jpeg','gif']
      if (!extensionValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg:'No es una extension de archivo de imagen permitida'
        })
      }

       //Generar el nombre del archivo unico
       const nombreArchivo = `${uuid()}.${extensionArchivo}`; 

       // (133) 5.53 min Path para guardar la imagen
       
       const path = `./uploads/${escritoTabla}/${nombreArchivo}`;

       //MOVER IMAGEN A RUTA DESEADA
        // Use the mv() method to place the file somewhere on your server--> de https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
       archivo.mv(path, (err)=> {
        if (err){
            console.log(err)

            return res.status(500).json({
                ok:false,
                msg:'Error al mover el archivo'
            });
        }

        //* (134)1.37 min Actualizar la BD

            
        actualizarImagen( escritoTabla, id ,nombreArchivo );

        res.json({
            ok:true,
            msg:'Archivo subido a: '+`${escritoTabla}`,
            identificador: nombreArchivo
        })
    
      
      });
    
}

//(137) 2.12 min Para obtener imagenes
const devolverImagen =  (req,res = response)=>{

    var tabla = req.params.tabla; //TABLA viene de la ruta que esta en subidas.routes
    var foto = req.params.foto;  // FOTO viene de la ruta que esta en subidas.rotues

    const pathImagen = path.join(__dirname,`../uploads/${tabla}/${foto}`); // path de la imagen

    //Foto por defecto
    if (filesystem.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
        
    }
    // SI no hay imagen se cagar una por defecto
    else{
        const pathNofoto = path.join(__dirname,`../uploads/nofoto.png`); // path de la imagen nofoto
        res.sendFile(pathNofoto);
    }



}




// EXPORTAMOS LAS FUNCIONES A SUBIDAS.ROUTES Y DE AHI A INDEX.JS
module.exports = {uploadFile, devolverImagen}