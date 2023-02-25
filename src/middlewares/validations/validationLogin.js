const { body } = require('express-validator');

const validations = [
    body('email').notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Debe ser un formato de correo válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

module.exports = validations;