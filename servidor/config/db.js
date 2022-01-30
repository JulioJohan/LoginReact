//Requiriendo mongo
const mongoose = require('mongoose');
//Requirimos el archivo variables.env la ruta donde esta nuestra base de datos
require('dotenv').config({path:'variables.env'});

//Funcion para conectar la base de datos
const conectarDB = async () => {
    //un try por si tenemos un error
    try{
        //tomando la url 
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true , 
            useUnifiedTopology: true,
           // useFindAndModify: false
        });
        console.log('Felicidades tu base de datos esta conectada');
    }catch(error){
        console.log(error.message);
        process.exit(1);//Detener la app
    }

}
module.exports = conectarDB;