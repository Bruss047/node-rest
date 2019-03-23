require('./config/config');//al ser en primer archivo en ejecucion va a configurar acorde a su contenid

const express = require('express');
const mongoose = require('mongoose');
const path=require('path');
const app = express();

const bodyParser = require('body-parser');

//Habilitar carpeta Public: 'path.resolve' estructura la direccion de la carpeta public y limpia errores.
app.use(express.static(path.resolve(__dirname,'../public')));
//console.log(path.resolve(__dirname,'../public'));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//app.use(require('./routes/usuario'));//Importo las rutas.

app.use(require('./routes/index'));//Configuracion global de rutas.
 

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex:true },(err,res)=>{
	if(err) throw err;

	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT,()=>{
	console.log('Escuchando puerto: ',3000);
})