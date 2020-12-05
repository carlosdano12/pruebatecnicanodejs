const { Router} = require('express');
const ruta = Router();
let UsuarioControler = require("../controllers/usuario");

//Rutas de la API de usuarios
ruta.get('/getAllUsers', UsuarioControler.getAllUsers);
ruta.post('/insert', UsuarioControler.insert);
ruta.post('/update', UsuarioControler.update);
ruta.post('/delete', UsuarioControler.delete);
ruta.post('/login', UsuarioControler.login);

module.exports = ruta;