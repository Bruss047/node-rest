const mongoose=require('mongoose');


let Schema = mongoose.Schema;

let categoriaSchema=new Schema({
	descripcion:{
		type:String,
		unique:true,
	    required:[true,'Description requerida']
	},
	usuario:{type:Schema.Types.ObjectId, //Se le  va a asignar un ID correspondiente a un objeto Mongo.
		    ref:'Usuario'}

});


module.exports=mongoose.model('Categoria',categoriaSchema);