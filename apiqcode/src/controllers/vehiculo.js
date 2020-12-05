const { json } = require('express');
const Vehiculo = require('../models/vehiculo');
const path = require('path');
const fs = require('fs');
var xlsx = require("xlsx");
const mysqlConnect = require("../database/database");

var controller = {

    //Devuleve todos los vehiculos de la DB con el estado 1
    getAllVehiculos: function (req, res) {

        Vehiculo.selectVehiculos(function (data) {

            return res.status(200).send(data);

        });
    },

    inhabilitados: function(req, res){

        Vehiculo.selectinHabilitados(function (data) {

            return res.status(200).send(data);

        });
    },

    //Esta ruta inserta un vehiculo en la DB
    insert: function (req, res) {

        const { placa, marca, modelo, color, detalle, id_usuario } = req.body;

        var nDate = fechaHoy();

        let d = nDate.split(' ');

        let di = d[0].split('-');

        let dia = di[2];

        let valor = calcularValor(modelo, dia);

        let fileName = "No Image";

        if (req.files) {

            let filePath = req.files.image.path;

            let fileSplit = filePath.split('\\');

            fileName = fileSplit[2];

        }

        new Vehiculo(null, placa, marca, modelo, color, detalle, fileName, id_usuario, nDate, nDate, 1, valor).insert(function (data) {

            return res.status(200).send(data);

        });
    },

    //Esta ruta actualiza los datos de un vehiculo
    update: function (req, res) {

        const { id_vehiculo, placa, marca, modelo, color, detalle, id_usuario, imagen, fecha } = req.body;

        var nDate = fechaHoy();

        let d = fecha.split(' ');

        let di = d[0].split('-');

        let dia = di[2];

        let valor = calcularValor(modelo, dia);

        let fileName = imagen;

        //en el cliente en la propiedad input type file mandar http://localhost:3000/api_vehiculos/getImage/imageNueva.jpg
        if (req.files) {

            if (req.files.image.type != "application/octet-stream") {

                try {

                    fs.unlinkSync('./src/images/' + imagen);

                    console.log('File removed');

                } catch (err) {

                    console.error('No se pudo eliminar el archivo', err)
                }

                let filePath = req.files.image.path;

                let fileSplit = filePath.split('\\');

                fileName = fileSplit[2];

            } else {

                console.log("no llegan archivo");
            }

        }

        new Vehiculo(id_vehiculo, placa, marca, modelo, color, detalle, fileName, id_usuario, fecha, nDate, null, valor).update(function (data) {

            return res.status(200).send(data);

        });

    },

    delete: function (req, res) {

        Vehiculo.delete(req.body.id_vehiculo, function (data) {

            return res.status(200).send(data);

        });

    },

    habilitar: function (req, res) {

        Vehiculo.habilitar(req.body.id_vehiculo, function (data) {

            return res.status(200).send(data);

        });

    },

    uploadExcel: function (req, res) {

        Vehiculo.selectAllVehiculos(function (data) {

            var nDate = fechaHoy();

            if (req.files) {

                let filePath = req.files.excel.path;

                let fileSplit = filePath.split('\\');

                fileName = fileSplit[2];

                const excel = xlsx.readFile("./src/excels/" + fileName);
                var nombreHoja = excel.SheetNames;
                let datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

                const jDatos = [];

                for (const dato in datos) {

                    const datosExcel = datos[dato];

                    jDatos.push({

                        ...datosExcel, fecha_insert: new Date((datosExcel.fecha_insert)).toLocaleString("es-CO", { hour12: false, timeZone: "America/Bogota" })
                    });
                }

                for (i in jDatos) {

                    let exist = false;

                    for (j in data) {

                        if (jDatos[i].placa == data[j].placa) {

                            //update: existe en el excel y en la base de datos
                            exist = true;
                            new Vehiculo(data[j].id_vehiculo, jDatos[i].placa, jDatos[i].marca, jDatos[i].modelo, jDatos[i].color, jDatos[i].detalle, "No image", req.body.id_usuario, jDatos[i].fecha_insert, nDate, null, jDatos[i].valor).update(function (data) {});

                        }
                    }

                    if (exist == false) {

                        //insert: no existe en la db
                        new Vehiculo(null, jDatos[i].placa, jDatos[i].marca, jDatos[i].modelo, jDatos[i].color, jDatos[i].detalle, "No image", req.body.id_usuario, jDatos[i].fecha_insert, nDate, 1, jDatos[i].valor).insert(function (data) {});
                    }
                }

                for(j in data){

                    let exist = false;

                    for(i in jDatos){

                        if (data[j].placa == jDatos[i].placa) {

                            //existe en el excel y en la base de datos, se detiene el for porque ya fue actualizado
                            exist = true;
                            break;
                        }
                    }

                    if(exist == false){

                        //no exciste en el excel inhabilitar
                        Vehiculo.inhabilitar(data[j].id_vehiculo,fechaHoy(),0,function (data) {});
                    }
                }

                return res.status(200).send({
                    datosExcel: jDatos,
                    dataDB: data
                });

            }

        });



    },

    //Devuelve una imagen del servidor
    getImagen: function (req, res) {

        let file = req.params.image;

        let path_file = './src/images/' + file;

        fs.exists(path_file, (exists) => {

            if (exists) {

                return res.sendFile(path.resolve(path_file));
            } else {

                return res.status(200).send({ mensaje: 'No encontrado' });
            }
        });
    },

    guardar: function (req, res) {
        var original_data = req.body.data;

        console.log(req.body.data);
        console.log("cod: " + req.body.codigo);
        //fs.readFile(image_origial, (err, original_data) => {
        //fs.writeFile('image_orig.jpg', original_data, function (err) { });
        fs.writeFile('./src/images/imageNueva.jpg', original_data, "base64", function (err) { });
        //});
        return res.status(200).send({ mensaje: "okk" });
    }

};

function calcularValor(modelo, dia) {

    let base = 200000;

    let valor = 0;

    if (modelo <= 1997) {

        valor = (base * 0.2);
    }

    if (dia % 2 == 0) {

        valor = (base * 0.05) + base + valor;

    } else {

        valor = base + valor;

    }

    return valor;

}

function fechaHoy(){

    var nDate = new Date().toLocaleString('es-CO', {

        hour12: false,

        timeZone: 'America/Bogota'

    });
    return nDate;
}

module.exports = controller;