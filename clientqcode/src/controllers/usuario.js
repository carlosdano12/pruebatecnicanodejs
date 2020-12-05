const Usuario = require('../models/usuario');

var controller = {

    home: function (req, res) {

        res.render('login');
    },

    login: function (req, res) {

        Usuario.login(req.body.correo, req.body.contrasena, function (data) {

            let datosSession = JSON.parse(data);

            req.session.id_usuario = datosSession.id_usuario;
            req.session.id_rol = datosSession.id_rol;
            req.session.correo = datosSession.correo;
            
            if (req.session.id_rol == 1) {

                res.redirect('/regEmpleados');

            } else {

                res.redirect('/getAllVehiculos');
            }
        });

    },

    regEmpleados: function (req, res) {

        if (req.session.correo) {

            if (req.session.id_rol == 1) {

                Usuario.selectEmpleados(function (data) {

                    let empleados = JSON.parse(data);
                    
                    res.render('registroEmpleado', { empleados });
                });
            } else {

                res.write('<h1>Usted no tiene acceso a esta pagina.</h1>');
                res.end('<font size=16><a  href=' + '/getAllVehiculos' + '>Registro de Vehiculos</a></font>');
            }
        } else {
            res.write('<h1>Por favor haga el login primero.</h1>');
            res.end('<font size=16><a  href=' + '/home' + '>Login</a></font>');
        }
    },

    insert: function (req, res) {

        const { id_rol, nombre, apellido, telefono, correo, contrasena } = req.body;

        new Usuario(null, nombre, apellido, telefono, correo, contrasena, id_rol).insert(function (data) {

            return res.status(200).send(data);

        });
    },

    update: function (req, res) {

        const { id_usuario, nombre, apellido, telefono } = req.body;

        new Usuario(id_usuario, nombre, apellido, telefono, null, null, null).update(function (data) {

            return res.status(200).send(data);

        });
    },

    delete: function (req, res) {

        Usuario.delete(req.body.id_usuario, function (data) {

            res.redirect('/regEmpleados');

        });
    },

    logout: function(req, res){

        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/home');
        });
    }
};

module.exports = controller;