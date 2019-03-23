const express= require ('express');
const fileUpload= require('express-fileupload');
const app= express();

const fs=require('fs');
const path= require('path');

const Usuario=require('../models/usuario');
const Producto=require('../models/producto');


app.use( fileUpload({ useTempFiles: true }) );//carga todo lo que se suba a un objeto llamado 'files'.

app.put('/upload/:tipo/:id',(req,res)=>{

	let tipo= req.params.tipo;
	let id=req.params.id;

	if(!req.files){
		return res.status(400).json({
					ok:false,
					err
				});
	}


	//validar TIPOS:
	let tiposValidos= ['productos','usuarios'];
	if(tiposValidos.indexOf(tipo)<0){
         return res.status(400).json({
				ok:false,
				err:{
					message: 'Las tipos validas son '+tiposValidos.join(', ')
				}
			})


	}



		let archivo=req.files.archivo;//toma lo que le pasemos como archivo.
		let nombreCortado=archivo.name.split('.');
		let extension= nombreCortado[nombreCortado.length-1];
		
		//EXTENSIONES PERMITIDAS:
		let extensionesValidas=['png','jpg','gif','jpeg'];
		if(extensionesValidas.indexOf(extension)<0){
			return res.status(400).json({
				ok:false,
				err:{
					message: 'Las extensiones validas son '+extensionesValidas.join(', '),
					ext: extension
				}
			})
		}

		//CAMBIAR NOMBRE AL ARCHIVO:
		let nombreArchivo=`${id}-${new Date().getMilliseconds()}.${extension}`;


		archivo.mv(`uploads/${tipo}/${nombreArchivo}`,(err)=>{//adonde voy a mover/guardar el archivo.

			if(err){
				return res.status(500).json({
					ok:false,
					err

				});
			}

			//Imagen cargada.


				// res.json({
				// 	ok:true,
				// 	message:'Imagen subida correctamente.'
				// });
			if(tipo==='usuarios'){
			imagenUsuario(id,res,nombreArchivo);
		     }else{
		     	imagenProducto(id,res,nombreArchivo);
		     }
				     
				
		});				
});

function imagenUsuario(id,res,nombreArchivo){//mando por referencia la respuesta.

	// res.json({
	// 	message:'Usuario no existe'
	// });
	Usuario.findById(id, (err,usuarioDB)=>{
       if(err){
   	   borraArchivo(nombreArchivo,'usuarios');//Aunque ocurra un error la imagen ya se subio, en ese caso tengo que borrarla.
       return res.status(500).json({
		ok:false,
		err
});

   }

   
   if(!usuarioDB){
   	 borraArchivo(nombreArchivo,'usuarios');
   	 return res.status(400).json({
		ok:false,
		err:{
			message:'Usuario no existente'
		}
      });
	
   }
   // let pathImagen= path.resolve(__dirname, `../../uploads/usuarios/${usuarioDB.img}`);//Cada elemento del resolve son segmentos del path que quiero construir.
   // if(fs.existsSync(pathImagen)){
   // 	fs.unlinkSync(pathImagen);//Si existe ese archivo, se borra.
   // }


   borraArchivo(usuarioDB.img,'usuarios');


   usuarioDB.img=nombreArchivo;

   usuarioDB.save((err,usuarioGuardado)=>{
   		res.json({
   			ok:true,
   			usuario:usuarioGuardado,
   			img:nombreArchivo,
   		});
   });


	});
}



function imagenProducto(id,res,nombreArchivo){


	Producto.findById(id, (err,productoDB)=>{
		
   if(err){
   	   borraArchivo(nombreArchivo,'productos');//Aunque ocurra un error la imagen ya se subio, en ese caso tengo que borrarla.
       return res.status(500).json({
		ok:false,
		err
});

   }

   if(!productoDB){
   	 borraArchivo(nombreArchivo,'productos');
   	 return res.status(400).json({
		ok:false,
		err:{
			message:'Producto no existente'
		}
      });

   }
   // let pathImagen= path.resolve(__dirname, `../../uploads/usuarios/${usuarioDB.img}`);//Cada elemento del resolve son segmentos del path que quiero construir.
   // if(fs.existsSync(pathImagen)){
   // 	fs.unlinkSync(pathImagen);//Si existe ese archivo, se borra.
   // }


   borraArchivo(productoDB.img,'productos');


   productoDB.img=nombreArchivo;

   productoDB.save((err,productoGuardado)=>{
   		res.json({
   			ok:true,
   			producto:productoGuardado,
   			img:nombreArchivo
   		});
   });


	});


}
 


let borraArchivo=(nombreImagen,tipo)=>{
let pathImagen= path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);//Cada elemento del resolve son segmentos del path que quiero construir.
   if(fs.existsSync(pathImagen)){
   	fs.unlinkSync(pathImagen);//Si existe ese archivo, se borra.
   }
}
module.exports=app;