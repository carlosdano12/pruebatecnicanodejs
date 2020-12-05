const mysql = require('mysql');

const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbqcode'
});

mysqlConnect.connect(function(err){

    if(err){
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }
});

module.exports = mysqlConnect;