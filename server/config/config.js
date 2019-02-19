
//Puerto:(env= enviroment)

// process.env.PORT=process.env.PORT||3000; //variable global.

// //===================== ENTORNO ==================
// process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

// //===================== BASE DE DATOS ==================

// let urlDB;

// if(process.env.NODE_ENV==='dev'){
// 	urlDB='mongodb://localhost:27017/cafe';
// }else{

// 	urlDB=process.env.MONGO_URI;
// 	//'mongodb+srv://javi047:sherlockip300@cafe-nz7si.mongodb.net/test?retryWrites=true'
// };

// process.env.URLDB=urlDB;



//////////////////////////////////



// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ============================
//  Vencimiento del Token:
// ============================
//60seg
//60min
//24horas
//30 dias
process.env.CADUCIDAD_TOKEN=60*60*24*30;

// ============================
//  SEED de autenticacion:
// ============================
process.env.SEED= process.env.SEED||'secret';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

