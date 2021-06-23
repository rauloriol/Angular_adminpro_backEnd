
const express = require('express'); // es como el import en angular
require ('dotenv').config(); // (97) para variables de entorno com el puerto y el usr y contraseña
const cors = require('cors');//(98) instalacion de cors para poder hacer petitices de cualquier sitio

const { dbConexion } = require('./Database/config'); // (96) importamos la funcionn de conexion a bd de atlas



//* Crear servidor de express
const app = express(); //*(91) inicializa la app de express

//* Configurar CORS (98)
app.use(cors());

//* Lectura y parseo del body (106)
app.use( express.json());

//* Bases de datos (96)
dbConexion();


//*Rutas (93) 
//se hace en la ruta padre con un callback mediante un request(lo que se solicita) y un response(lo que el servidor responde al cliente)
//(106) 3.16 min  Utilizamos un middleware con el app.use() dando una ruta por defecto ('api/usuarios')
app.use('/api/usuarios',require('./routes/usuarios.routes'));

//(122) ruta del hospital
app.use('/api/hospitales',require('./routes/hospitales.routes'));

//(123) ruta del hospital
app.use('/api/medicos',require('./routes/medicos.routes'));

//(115) RUTA DE AUTENTIFICACION
app.use('/api/login',require('./routes/auth.routes'));

//(129) 0.48 min BUSQUEDA TOTAL, que devuelve todo lo que coincida en las colecciones que estan en la DB
app.use('/api/buscador',require('./routes/busqueda.routes'));

//(132) 1.25 min SUBIR ARCHIVOS, para subir archivos o imagenes
app.use('/api/upload',require('./routes/subidas.routes'));




app.listen(process.env.PORT,()=>{
    console.log('Server starts in port:' + process.env.PORT);
});
 

//Instalacion de nodemon
// npm install -g --force nodemon para WINDOWS en modo admin
//sudo npm install -g nodemon en linux o mac
// para arrancarlo -> nodemon index.js

// (96)Instalamos mongoCompass
// (96) Instalamos mongoosejs.com que es la conexion a la bd --> npm install mongoose
//(96) NOs creamos una carpeta database donde dentro se hara la configuracion de mongoose
//(97) Guardamos las variables de entorno como son el puerto y la cadena de conexion en otro archivo

//(98) npm install cors para aceptar peticiones de diferentes dominios no solo del localhost