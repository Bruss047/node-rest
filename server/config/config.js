
//Puerto:(env= enviroment)

process.env.PORT=process.env.PORT||3000; //variable global.

//===================== ENTORNO ==================
process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

//===================== BASE DE DATOS ==================
let urlDB;

if(process.env.NODE_ENV==='dev'){
	urlDB='mongodb://localhost:27017/cafe';
}else{

	urlDB='mongodb://javi047:sherlockip300@cafe-shard-00-00-nz7si.mongodb.net:27017,cafe-shard-00-01-nz7si.mongodb.net:27017,cafe-shard-00-02-nz7si.mongodb.net:27017/test?ssl=true&replicaSet=cafe-shard-0&authSource=admin&retryWrites=true'
};

process.env.URLDB=urlDB;

