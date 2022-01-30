const Usuario = require('../models/Usuario');

//Importamos la dependencia que es para hasear los passwords
const bcryptjs = require ('bcryptjs');
//Importar el resultado de la validacion
const{ validationResult } = require ('express-validator');
//Importando el JSON Web Token
const jwt = require('jsonwebtoken');

//Enviando la peticion o lo que se llegue a ejecutar
exports.crearUsuario = async(req, res) =>{

  //Revisar si hay errores
  const errores = validationResult(req);
  //revisar si el arreglo esta vacio si no esta vacio 
  //significa que no hay errores
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
  }

 //Extraer email y password
 const {email, password} = req.body;
 
    try{
        //Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email});

    //Si existe un usuario existente
    if(usuario){
        return res.status(400).json({msg: 'El usuario ya existe :('})
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);
    
    //Hashear el password
    //salt hashea de diferente forma las contrasenas
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt)

    //guardar usuario
    await usuario.save();
    //Crear y firmar el JWT
    const payload = {
      usuario:{
        id:usuario.id
      }
    }
    //firmar el JWT
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600 //1hora El token durara una hora , significa que el usuario 
    }, (error, token) => {
      if(error) throw error;

      res.json({token:token});
    })
    //Mensaje de confirmacion
    res.json({msg: 'Usuario creado correctamente'});
  }catch(error){ 
    console.log(error.mesage);
    res.status(400).send('Hubo un error');
  }
}