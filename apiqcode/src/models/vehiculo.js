const mysqlConnect = require("../database/database");

class Vehiculo{

    constructor(id_vehiculo, placa, marca, modelo, color, detalle, imagen, id_usuario, fecha_insert, fecha_update, estado, valor){

        this.id_vehiculo = id_vehiculo;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this. color = color;
        this.detalle = detalle;
        this. imagen = imagen;
        this.id_usuario= id_usuario;
        this.fecha_insert = fecha_insert;
        this.fecha_update = fecha_update;
        this.estado = estado;
        this.valor = valor;
    }

    static selectVehiculos(callback){
        
        mysqlConnect.query('SELECT * FROM vehiculos where estado = 1', (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
        
    }

    static selectinHabilitados(callback){
        
        mysqlConnect.query('SELECT * FROM vehiculos where estado = 0', (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
        
    }

    static selectAllVehiculos(callback){
        
        mysqlConnect.query('SELECT * FROM vehiculos', (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
        
    }

    insert(callback){

        let query = "INSERT INTO vehiculos VALUES (?)";
        let datos = [null,this.placa, this.marca, this.modelo, this.color, this.detalle, this.imagen, this.id_usuario, this.fecha_insert, this.fecha_update, this.estado, this.valor];
        mysqlConnect.query(query,[datos], (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });
    }

    update(callback){

        let query = "UPDATE vehiculos SET placa = ?, marca = ?, modelo = ?, color = ?, detalle = ?, imagen = ?, id_usuario = ?, fecha_insert = ?, fecha_update = ?, valor = ? WHERE vehiculos.id_vehiculo = ?;";
        let datos = [this.placa, this.marca, this.modelo, this.color, this.detalle, this.imagen, this.id_usuario, this.fecha_insert, this.fecha_update, this.valor, this.id_vehiculo];
        mysqlConnect.query(query,datos, (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });
    }

    static inhabilitar(id_vehicul, fecha_inser, estad, callback){

        let query = "UPDATE vehiculos SET fecha_insert = ?, estado = ? WHERE vehiculos.id_vehiculo = ?;";
        let datos = [fecha_inser, estad, id_vehicul];
        mysqlConnect.query(query,datos, (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });

    }

    static delete(id_vehiculo, callback){

        mysqlConnect.query('DELETE FROM vehiculos WHERE vehiculos.id_vehiculo = ?', id_vehiculo, (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
    }

    static habilitar(id_vehiculo, callback){

        let query = "UPDATE vehiculos SET estado = 1 WHERE vehiculos.id_vehiculo = ?;";
        let datos = [id_vehiculo];
        mysqlConnect.query(query,datos, (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });
    }
}

module.exports = Vehiculo;