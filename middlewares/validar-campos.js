// (110) Son parecidos a los controladores 
const {response} = require('express');
const {validationResult} = require('express-validator');


const validarCampos = (req,res = response,next)=>{

     //(109) Para ver los resultados que devuelve el validador
     const errores = validationResult(req); // (109) nos devuelve un arreglo de errores que tubimos en mi ruta
     if (!errores.isEmpty()) {
         return res.status(400).json({
             ok:false,
             Errors:errores.mapped()
         });
     }

     next();
}

module.exports = {validarCampos}; // lo exportamos a usuarios.routes
