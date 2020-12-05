const { Router} = require('express');
const ruta = Router();
let UsuarioControler = require("../controllers/usuario");

//Rutas del usuarios
ruta.get('/home', UsuarioControler.home);
ruta.post('/login', UsuarioControler.login);
ruta.get('/logout', UsuarioControler.logout);
ruta.get('/regEmpleados', UsuarioControler.regEmpleados);
ruta.post('/insertEmpleados', UsuarioControler.insert);
ruta.post('/updateEmpleados', UsuarioControler.update);
ruta.post('/deleteEmpleados', UsuarioControler.delete);

module.exports = ruta;