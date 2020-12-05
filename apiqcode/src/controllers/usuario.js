const { json } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
var controller = {

    getAllUsers: function (req, res) {


        let rows = Usuario.selectUsuarios(function (data) {

            return res.status(200).send(data);

        });
    },

    insert: function (req, res) {

        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);

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

            return res.status(200).send(data);

        });

    },

    login: function (req, res) {

        Usuario.login(req.body.correo, function (data) {

            let con = JSON.stringify(data);

            let contra = JSON.parse(con);

            const equals = bcrypt.compareSync(req.body.contrasena, contra[0]['contrasena']);

            if (equals) {

                return res.status(200).send({ id_usuario: contra[0]['id_usuario'], id_rol: contra[0]['id_rol'], correo: contra[0]['correo'] });

            } else {
                return res.status(200).send({ id_usuaio: 0 });
            }
        });
    }

};

module.exports = controller;