const mysqlConnect = require("../database/database");

class Usuario{

    constructor(id_usuario, nombre, apellido, telefono, correo, contrasena, id_rol){
        
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasena = contrasena;
        this.id_rol = id_rol;
    }

    static selectUsuarios(callback){
        
        mysqlConnect.query('SELECT * FROM usuarios where id_rol = 2', (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
        
    }

    insert(callback){

        let query = "INSERT INTO usuarios VALUES (?)";
        let datos = [null,this.id_rol, this.nombre, this.apellido, this.telefono, this.correo, this.contrasena];
        mysqlConnect.query(query,[datos], (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });
    }

    update(callback){

        let query = "UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ? WHERE usuarios.id_usuario = ?;";
        let datos = [this.nombre, this.apellido, this.telefono, this.id_usuario];
        mysqlConnect.query(query,datos, (err,row,fields) =>{

            if(!err){

                callback(row);
            }else{

                callback(err);
            }
        });
    }

    static delete(id_usuario, callback){

        mysqlConnect.query('DELETE FROM usuarios WHERE usuarios.id_usuario = ?', id_usuario, (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });
    }

    static login(correo, callback){

        mysqlConnect.query('SELECT id_usuario, id_rol, contrasena, correo FROM usuarios WHERE correo = ?',correo, (err, rows, fields) =>{

            if(!err){
                
                callback(rows);
            }else{
                
                callback(err);
            }

        });

    }
}

module.exports = Usuario;