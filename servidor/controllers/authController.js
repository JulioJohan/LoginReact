const Usuario = require('../models/Usuario');

//Importamos la dependencia que es para hasear los passwords
const bcryptjs = require ('bcryptjs');
//Importar el resultado de la validacion
const{ validationResult } = require ('express-validator');
//Importando el JSON Web Token
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) =>{

        //Revisar si hay errores
        const errores = validationResult(req);
        //revisar si el arreglo esta vacio si no esta vacio 
        //significa que no hay errores
        if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array()})
        }

        //Extraer el email y password
        const {email, password} = req.body;

        try{
            //Revisar que sea un usuario registrado
            let usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(400).json({msg: 'El usuario no existe'});
            }
            //Revisar el password
            const passCorrecto = await bcryptjs.compare(password, usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg:'Password incorrecto'});
            }
            //Si todo es correcto genera un JWT
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
      });
        }catch(error){
            console.log(error); 
        }
}