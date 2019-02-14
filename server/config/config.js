
//Puerto:(env= enviroment)

process.env.PORT=process.env.PORT||3000; //variable global.

//===================== ENTORNO ==================
process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

//===================== BASE DE DATOS ==================
const MongoUri=process.env.MONGO_URI;
let urlDB;

if(process.env.NODE_ENV==='dev'){
	urlDB='mongodb://localhost:27017/cafe';
}else{

	urlDB=MongoUri;
};

process.env.URLDB=urlDB;

