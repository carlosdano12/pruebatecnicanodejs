var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
const config = require('../config')
var url = config.api_url + "api_usuarios/getAllUsers";
var url2 = config.api_url + "api_usuarios/update";
var url3 = config.api_url + "api_usuarios/insert";
var url4 = config.api_url + "api_usuarios/delete";
var url5 = config.api_url + "api_usuarios/login";

class Usuario {

    constructor(id_usuario, nombre, apellido, telefono, correo, contrasena, id_rol) {

        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasena = contrasena;
        this.id_rol = id_rol;
    }

    static login(correo, contrasena, callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url5, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({
            correo: correo,
            contrasena: contrasena
        }));

    }

    static selectEmpleados(callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({ data: "Hola" }));
    }

    insert(callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url3, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({
            nombre: this.nombre,
            apellido: this.apellido,
            telefono: this.telefono,
            correo: this.correo,
            contrasena: this.contrasena,
            id_rol: this.id_rol
        }));

    }

    update(callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url2, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({
            id_usuario: this.id_usuario,
            nombre: this.nombre,
            apellido: this.apellido,
            telefono: this.telefono
        }));
    }

    static delete(id_usuario, callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url4, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({ id_usuario: id_usuario }));
    }

}

module.exports = Usuario;