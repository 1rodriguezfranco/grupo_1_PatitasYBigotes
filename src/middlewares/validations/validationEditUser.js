const { body } = require('express-validator');

const validations = [
    body('first_name').notEmpty().withMessage('El nombre es obligatorio'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Debe ser un formato de correo válido'),
];

module.exports = validations;