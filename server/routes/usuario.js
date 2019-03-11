const express = require('express');
const bcrypt=require('bcrypt');
const _=require('underscore');
const Usuario=require('../models/usuario');
//const tt= require('../middlewares/autenticacion');
const{verificaToken,verificaAdmin_Role}=require('../middlewares/autenticacion'); //Deconstruccion
const app = express();




app.get('/usuario',verificaToken,function (req, res) {//- Sin deconstruccion seria:tt.verificaToken.

  // return res.json({
  //   usuario:req.usuario,
  //   nombre: req.usuario.nombre,
  //   email:req.usuario.email,
  // });

  let desde=req.query.desde || 0; //sino se le da un patron, que arranque desde 0.
  desde=Number(desde);
  let limite=req.query.limite || 5;
  limite=Number(limite);

  //res.send('Hello World');
  //res.json('get Usuario LOCAL!');//envio en formato Json
  Usuario.find({estado:true},'nombre email role estado google img')//que se devuelvan todos los registros.
          .skip(desde)
          .limit(limite)//solo los primeros 5 registros.
          .exec((err,usuarios)=>{//'exec' -execute
            if(err){

       return res.status(400).json({
        ok:false,
        err
      });
      }

    Usuario.count({estado:true}, (err, conteo)=>{
      res.json({
      ok:true,
      usuarios,
      cuantos:conteo
    });

    });

    
          });

});



app.post('/usuario',[verificaToken, verificaAdmin_Role], function (req, res) {//Post se utiliza comunmente para crear registros(y PUT para actualizarlos).
  //res.send('Hello World');
  let body=req.body;//va a aparecer cuando sea necesario procesar las peticiones.
  
  let usuario= new Usuario({
    nombre:body.nombre,
    email:body.email,
    edad:body.edad,
    password:bcrypt.hashSync(body.password,10),//encripta y desordena los datos de la contraseña, '10' es un argumento dado para el num. de vueltas que queremos
    role: body.role
  });

  usuario.save((err, usuarioDB)=>{

    if(err){

       return res.status(400).json({
        ok:false,
        err
      });
    }

      //usuarioDB.password=null;

      res.json({
        ok:true,
        usuario: usuarioDB
        //usuarioDB: usuario
      });


});
  });
 
app.put('/usuario/:id',[verificaToken, verificaAdmin_Role], function (req, res) {

	let id=req.params.id;//el nombre de la variable no es el id en si.
  let body=_.pick(req.body,['nombre','email','img','role','estado']);

  //['nombre','email','img','role','estado'];//opciones que si quiero que se puedan actualizar.
   

   Usuario.findByIdAndUpdate(id,body,{new:true, runValidators:true},(err,usuarioDB)=>{//Función de Mongo.
    //{new:true} para enviar el registro actualizado en la misma consulta.
    if(err){

       return res.status(400).json({
        ok:false,
        err
      });
    }
    res.json({//envio en formato Json
      ok:true,
      usuario: usuarioDB
  });
   })

  
});

let cambiaEstado={
  estado:false
};

app.delete('/usuario/:id',[verificaToken, verificaAdmin_Role], function (req, res) {
  //res.send('Hello World');
  //res.json('Delete Usuario');//envio en formato Json.
  let id=req.params.id;

  //Usuario.findByIdAndRemove(id,(err, usuarioBorrado)=>{
  Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err, usuarioBorrado)=>{

    if(err){
       return res.status(400).json({
        ok:false,
        err
      });
    };

    if(!usuarioBorrado){

       return res.status(400).json({
        ok:false,
        err:{
          message:'Usuario no encontrado.'
        }
      });
    }

    
    res.json({
      ok:true,
      usuario:usuarioBorrado
    });

  });

});

module.exports=app;