const express = require('express');
const app = express();

//settings 
app.set('port', process.env.PORT || 3000);

//middleware
app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))

//rutas
app.use('/api_usuarios',require('./routes/usuario'));
app.use('/api_vehiculos', require('./routes/vehiculo'));

//Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
    });