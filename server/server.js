require('./config/config');//al ser en primer archivo en ejecucion va a configurar acorde a su contenid

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//app.use(require('./routes/usuario'));//Importo las rutas.
app.use(require('./routes/index'));//Configuracion global de rutas.
 

mongoose.connect(process.env.URLDB,(err,res)=>{
	if(err) throw err;

	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT,()=>{
	console.log('Escuchando puerto: ',3000);
})