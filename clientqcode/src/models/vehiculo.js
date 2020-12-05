var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;

const config = require('../config')
var url = config.api_url + "api_vehiculos/getAllVehiculos";
var url2 = config.api_url + "api_vehiculos/delete";
var url3 = config.api_url + "api_vehiculos/insert";
var url4 = config.api_url + "api_vehiculos/habilitar";
var url5 = config.api_url + "api_vehiculos/inhabilitados";

class Vehiculo {

    constructor(id_vehiculo, placa, marca, modelo, color, detalle, imagen, id_usuario, fecha_insert, fecha_update, estado, valor) {

        this.id_vehiculo = id_vehiculo;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.detalle = detalle;
        this.imagen = imagen;
        this.id_usuario = id_usuario;
        this.fecha_insert = fecha_insert;
        this.fecha_update = fecha_update;
        this.estado = estado;
        this.valor = valor;
    }

    static select(callback) {

        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({}));
    }

    static inhabilitados(callback) {

        var http = new XMLHttpRequest();
        http.open("GET", url5, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion
                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({}));
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
            "placa": this.placa,
            "marca": this.marca,
            "modelo": this.modelo,
            "color": this.color,
            "detalle": this.detalle,
            "imagen": this.imagen
        }));

    }

    static delete(id_vehiculo, callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url2, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion

                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({ "id_vehiculo": id_vehiculo }));

    }

    static habilitar(id_vehiculo, callback) {

        var http = new XMLHttpRequest();
        http.open("POST", url4, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                //aqui obtienes la respuesta de tu peticion

                callback(http.responseText);
            }
        };

        http.send(JSON.stringify({ "id_vehiculo": id_vehiculo }));

    }

}

module.exports = Vehiculo;