
//Creacion de la coleccion para mongo
const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    //Poniendo que es lo que ocupa 
    nombre:{
        type:String,
        required: true,
        //Trim hara la inserccion pero sin los espacios que agregar el usuario
        trim: true
    },
    email:{
        type:String,
        required: true,
        //Trim hara la inserccion pero sin los espacios que agregar el usuario
        trim: true,
        //que sea unico el correo ya que no tenemos que tener dos usuarios con el mismo correo
        unique: true
    },
    password:{
        //tipo de dato
        type:String,
        //Si es requierido el campo a llenar
        required: true,
        //Trim hara la inserccion pero sin los espacios que agregar el usuario
        trim: true,
    },
    registro:{
        type: Date,
        //generara una fecha al momento de registrarse
        default: Date.now()

    }
});

//
module.exports = mongoose.model('Usuario',UsuariosSchema);