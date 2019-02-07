require('./config/config');//al ser en primer archivo en ejecucion va a configurar acorde a su contenid


const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.get('/usuario', function (req, res) {
  //res.send('Hello World');
  res.json('get Usuario');//envio en formato Json
});

app.post('/usuario', function (req, res) {//Post se utiliza comunmente para crear registros(y PUT para actualizarlos).
  //res.send('Hello World');
  let body=req.body;//va a aparecer cuando sea necesario procesar las peticiones.
  
  if (body.nombre===undefined){

  	res.status(400).json({
  		ok:false,
  		mensaje: 'El nombre es necesario',

  	});//envio codigo de error.

  }else{
  	res.json({
  		persona:body
  	});
  }

});
 
app.put('/usuario/:id', function (req, res) {

	let id=req.params.id;//el nombre de la variable no es el id en si.
  //res.send('Hello World');
  res.json({

  	id

  });//envio en formato Json
});

app.delete('/usuario', function (req, res) {
  //res.send('Hello World');
  res.json('Delete Usuario');//envio en formato Json
});



app.listen(process.env.PORT,()=>{
	console.log('Escuchando puerto: ',3000);
})