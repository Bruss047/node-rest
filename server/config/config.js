
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
process.env.CADUCIDAD_TOKEN='48h';

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


// ============================
//  Google Client ID
// ============================

process.env.CLIENT_ID=process.env.CLIENT_ID || '639689503328-h13sahgmehmij2eu4895lo4mrmnk27qs.apps.googleusercontent.com';