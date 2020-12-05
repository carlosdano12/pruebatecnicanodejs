const Vehiculo = require('../models/vehiculo');

var controller = {

    getAllVehiculos: function (req, res) {

        if (req.session.correo) {

            if (req.session.id_rol == 2) {
                Vehiculo.select(function (data) {

                    let vehiculos = JSON.parse(data);

                    let id_usuario = req.session.id_usuario;

                    res.render('vehiculo', { vehiculos, id_usuario });
                });
            } else {
                res.write('<h1>Usted no tiene acceso a esta pagina.</h1>');
                res.end('<font size=16><a  href=' + '/regEmpleados' + '>Registro de Empleados</a></font>');
            }
        } else {
            res.write('<h1>Por favor haga el login primero.</h1>');
            res.end('<font size=16><a  href=' + '/home' + '>Login</a></font>');
        }
    },

    uploadExcel: function (req, res) {

        Vehiculo.select(function (data) {

            let vehiculos = JSON.parse(data);

            let id_usuario = req.session.id_usuario;

            res.render('excel', { vehiculos, id_usuario });
        });
    },

    habilitarVehiculo: function (req, res) {

        Vehiculo.inhabilitados(function (data) {

            let vehiculos = JSON.parse(data);

            let id_usuario = req.session.id_usuario;

            res.render('habilitarVehiculo', { vehiculos, id_usuario });
        });

    },

    delete: function (req, res) {

        Vehiculo.delete(req.body.id_vehiculo, function (data) {

            res.redirect('/getAllVehiculos');
        });
    },

    habilitar: function (req, res) {

        Vehiculo.habilitar(req.body.id_vehiculo, function (data) {

            res.redirect('/habilitarVehiculo');
        });
    }

};

module.exports = controller;