//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//Importando el usuarioController
const usuarioController = require('../controllers/usuarioController')
//Importando el express validator
const {check} = require('express-validator')
//Creando usuarios
//api/usuarios
//Enviando informacion al usuario

router.post('/',
    //Poniendo restrincciones
    [   //Va a revisar que no este vacio
        check('nombre','El nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caractere y con un caracter especial').isLength({min:6})
    ],

    usuarioController.crearUsuario
);

module.exports = router;