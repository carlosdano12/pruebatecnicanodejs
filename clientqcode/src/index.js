const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

//settings 
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'key-1Qcode-2Secret',
    resave: false,
    saveUninitialized: false,
    cookie: false,

})); 

//rutas
app.use(require('./routes/usuario'));
app.use(require('./routes/vehiculo'));

//Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
    });