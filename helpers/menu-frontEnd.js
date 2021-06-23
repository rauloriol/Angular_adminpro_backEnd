
// (240) Copidado del sidebar-Service
// Lo que se pretende es que dependiendo del rol si es usuario o admin el menu tenga unas opciones u otras

 const getMenuFrontEnd = ( rol='USER_ROLE' )=>{

    const menu = [

            {
              titulo:'Dashboard',
              icono:'mdi mdi-gauge',
              submenu:
              [
                {titulo:'Menu',url:'/'},
                {titulo:'Barra Progreso',url:'/progress'},
                {titulo:'Gráficas',url:'/graficas1'},
                /* {titulo:'Promesas',url:'/promesas'}, */ 
                /* {titulo:'RXJS',url:'/rxjs'} */ 
              ]
        
             },
        
             //(196) Creacion de un nuevo submenu en el sidebar
            {
              titulo:'Mantenimiento',
              icono:'mdi mdi-folder-lock-open',
              submenu:
              [
                /* {titulo:'Usuarios',url:'/usuarios'}, */            // (240) 2.48 min si no es admin que no pueda hacer este mantenimiento
                {titulo:'Hospitales',url:'/hospitales'},
                {titulo:'Médicos',url:'/medicos'},
        
              ]
        
             }
    ];

    //3.16 MIN hacemos la condicion para el ADMIN_ROLE para que el si que vea la parte de mantenimiento de usuarios
    // y dos rutas más

    if (rol==='ADMIN_ROLE') {

        menu[0].submenu.push( {titulo:'Promesas',url:'/promesas'},{titulo:'RXJS',url:'/rxjs'} )        // añade nuevos elementos al final del array
        menu[1].submenu.unshift( {titulo:'Usuarios',url:'/usuarios'} )                              // añade nuevos elementos al principio del array
    }
    return menu;

}

module.exports={getMenuFrontEnd}

