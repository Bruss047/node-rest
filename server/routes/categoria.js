const express= require ('express');

let{verificaToken,verificaAdmin_Role}=require('../middlewares/autenticacion');

let app= express();
const _=require('underscore');

const Categoria= require('../models/categoria');


//mostrar categorias /OK!
app.get('/categoria',verificaToken,function (req, res){

	 Categoria.find()
	.sort('descripcion')
	.populate('usuarios','nombre email')//Crear esquemas como deseemos llenar.
	.exec((err,categorias)=>{//'exec' -execute
            if(err){
    	   return res.status(400).json({
	        ok:false,
        	err
      });
      }
      	res.json({
      	ok:true,
      	categorias
      	
    
    });

          });

});

//Mostrar categoria por ID/ OK!!!
app.get('/categoria/:id',verificaToken,function (req, res){
	//Categoria.findByid();  funcion de moongose.
	let id=req.params.id;

     Categoria.findById(id,(err,categoriaDB)=>{//'exec' -execute
            if(err){
    	   return res.status(500).json({
	        ok:false,
        	err
      });
      }

      if(!categoriaDB){
      	return res.status(500).json({
	        ok:false,
        	err:{
        		message: 'El ID no es correcto'
        	}
      });

      }

      	res.json({
      	ok:true,
      	categoria: categoriaDB
    
    });

          });




});


//Crear nueva categoria /OK!

app.post('/categoria',[verificaToken,verificaAdmin_Role], function (req, res){
	//req.usuario._id
	let body= req.body;

	let categorias= new Categoria({
	descripcion:body.descripcion,
	usuario:req.usuario._id
	});

	categorias.save((err,categoriaDB)=>{

		if(err){

			return res.status(400).json({
				ok: false,
				err:{
					message:"Descripcion o Usuario no validos."
				}
			});
		}

		res.json({
        ok:true,
        categorias:categoriaDB
        
      });

	});

});


//Actuzalizar categoria/ OK!!!!
app.put('/categoria/:id',[verificaToken, verificaAdmin_Role],function (req, res){
	let id=req.params.id;
	let body= req.body;
    //let body=_.pick(req.body,['descripcion']);
    let descCategoria={
    	descripcion: body.descripcion
    };
	Categoria.findByIdAndUpdate(id,descCategoria,{new:true, runValidators:true},(err,categoriaDB)=>{//Función de Mongo.
    //{new:true} para enviar el registro actualizado en la misma consulta.
    if(err){

       return res.status(400).json({
        ok:false,
        err
      });
    }
    res.json({//envio en formato Json
      ok:true,
      categoria:categoriaDB
  });
   })

  
	

});


//OK!!!
app.delete('/categoria/:id',[verificaToken,verificaAdmin_Role],function (req, res){
	//solo adm puede borrar categoria. pedir token.
	//categoria.findByIdAndRemove.
	let id=req.params.id;
	Categoria.findByIdAndRemove(id,(err, usuarioBorrado)=>{

    if(err){
       return res.status(500).json({
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