//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();

//Importando el express validator
const {check} = require('express-validator')

const authController = require('../controllers/authController');
//Creando usuarios
//api/auth
//Enviando informacion al usuario

router.post('/',
    //Poniendo restrincciones
    [   //Va a revisar que no este vacio
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caractere y con un caracter especial').isLength({min:6})
    ],
 authController.autenticarUsuario
  
);

module.exports = router;