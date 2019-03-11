
const express= require('express');
const {verificaToken,verificaAdmin_Role}=require('../middlewares/autenticacion');

let app=express();//inicializo variable de express.

let Producto=require('../models/producto');

//====== Obtener Productos:

app.get('/productos',verificaToken,(req,res)=>{
	//Trae todos los productos. populate: usuario, categoria
	//paginado.
  let desde=req.query.desde||0;
  desde=Number(desde);
	Producto.find({disponible:true})
	.skip(desde)
  .limit(5)
	.populate('usuario','nombre email')//Crear esquemas como deseemos llenar.
  .populate('categoria','descripcion')
	.exec((err,productos)=>{//'exec' -execute
            if(err){
    	       return res.status(500).json({
	             ok:false,
        	    err
           });
      }
      	res.json({
      	ok:true,
      	productos
      	
    
    });

          });


});

app.get('/productos/:id',verificaToken,(req,res)=>{

	let id=req.params.id;

     Producto.findById(id)
     .populate('usuario','nombre email')//Crear esquemas como deseemos llenar.
     .populate('categoria','descripcion')
     .exec((err,productoDB)=>{//'exec' -execute
            if(err){
    	   return res.status(500).json({
	        ok:false,
        	err
      });
      }


      if(!productoDB){
      	return res.status(400).json({
	        ok:false,
        	err:{
        		message: 'El ID no es correcto'
        	}
      });

      }

      	res.json({
      	ok:true,
      	producto:productoDB
    
    });

          });





});

//====== Buscar Productos:

    app.get('/productos/buscar/:termino',verificaToken,(req,res)=>{

        let termino=req.params.termino;
        let regex= new RegExp(termino,'i');//funcion de JavaScrip, en vez de enviar el termino literal, busca la expresion regular. la 'i' se pone para que tome igual mayus/minus.

        Producto.find({nombre:regex})
        .populate('categoria','descripcion')
        .exec((err,productos)=>{
          if(err){
            return res.status(500).json({
              ok:false,
              err
            });
          }

           res.json({
              ok:true,
              productos
            })
        })

    });

//====== Crear Productos:
app.post('/productos',[verificaToken,verificaAdmin_Role],(req,res)=>{
	

	let body= req.body;

	// let categorias= new Categoria({
	// descripcion:body.descripcion,
	// usuario:req.usuario._id
	// });

	let productos = new Producto({
    nombre:body.nombre,
    precioUni: body.precioUni,
    descripcion:body.descripcion,
    disponible: body.disponible,
    categoria:body.categoria
   
});

	productos.save((err,productoDB)=>{

		if(err){

			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.status(201).json({
        ok:true,
        productos:productoDB
        
      });

	});


});

//====== Actualizar Productos:
app.put('/productos/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
	//grabar usuario
	//grabar una categoria del listado

	let id= req.params.id;
	let body= req.body;

	Producto.findById(id,(err,productoDB)=>{

		if(err){
			return res.status(500).json({
        ok:false,
        err
      });
		}

		if(!productoDB){

		return res.status(400).json({
        ok:false,
        err:{
        	message:'El ID no existe'
        }
      });

		}
		
		productoDB.nombre=body.nombre;
		productoDB.precioUni=body.precioUni;
		productoDB.categoria=body.categoria;
		productoDB.disponible=body.disponible;
		productoDB.descripcion=body.descripcion;

		productoDB.save((err,productoGuardado)=>{

			if(err){
			return res.status(500).json({
            ok:false,
            err
            });
		}
			res.json({
				ok:true,
				producto:productoGuardado
			})
		})


	});

  
});


//====== Borrar Productos:
// let cambiaEstado={
//   disponible:false
// };
app.delete('/productos/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
	let id=req.params.id;

	Producto.findByIdAndUpdate(id,{disponible:false},{new:true},(err, productoBorrado)=>{

    if(err){
       return res.status(500).json({
        ok:false,
        err
      });
    };

    if(!productoBorrado){

       return res.status(400).json({
        ok:false,
        err:{
          message:'Producto no encontrado.'
        }
      });
    }
    //productoBorrado.disponible=false (ALTERNATIVA PARA BORRAR/ACTUALIZAR sin usar findAndUpdate).
    res.json({
      ok:true,
      usuario:productoBorrado,
      notificacion: 'Producto borrado'
    });

  });


});



module.exports=app;