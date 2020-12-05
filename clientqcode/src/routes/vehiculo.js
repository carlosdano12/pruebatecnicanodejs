const { Router} = require('express');
const ruta = Router();
let VehiculoControler = require('../controllers/vehiculo');

//Rutas de la API de usuarios
ruta.get('/getAllVehiculos', VehiculoControler.getAllVehiculos);
ruta.post('/delete', VehiculoControler.delete);
ruta.get('/uploadExcel', VehiculoControler.uploadExcel);
ruta.get('/habilitarVehiculo', VehiculoControler.habilitarVehiculo);
ruta.post('/habilitar', VehiculoControler.habilitar);

module.exports = ruta;