//Importamos express para nuestro servidor
const express = require ('express'); 
//Importando la funcion
const conectarDB = require('./config/db');
//Importando cors   
const cors = require('cors');
//Creando el servidor

//Importando express y utilizamos la funcion de express
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitando cors
app.use(cors());

//Habilitar el express.json  mas que nada este nos permitira leer datos que el usuario coloque
app.use(express.json({extenden: true}));


//Puerto de la app
//se asigna al puerto o 4000 ya que si ponemos 3000 chocaran lo del cliente
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));

//arrancando la app
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
});
