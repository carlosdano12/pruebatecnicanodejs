const { Router} = require('express');
const ruta = Router();
let VehiculoControler = require('../controllers/vehiculo');
var multipart = require('connect-multiparty');

//middleware
var multipartMiddleware = multipart({ uploadDir: './src/images'});
var multipartMiddleware2 = multipart({ uploadDir: './src/excels'});

//Rutas de la API de usuarios
ruta.get('/getAllVehiculos', VehiculoControler.getAllVehiculos);
ruta.post('/insert', multipartMiddleware, VehiculoControler.insert);
ruta.post('/update', multipartMiddleware, VehiculoControler.update);
ruta.post('/delete', VehiculoControler.delete);
ruta.post('/uploadExcel', multipartMiddleware2, VehiculoControler.uploadExcel);
ruta.get('/getImage/:image', VehiculoControler.getImagen);
ruta.post('/guardar', VehiculoControler.guardar);
ruta.post('/habilitar', VehiculoControler.habilitar);
ruta.get('/inhabilitados', VehiculoControler.inhabilitados);

module.exports = ruta;