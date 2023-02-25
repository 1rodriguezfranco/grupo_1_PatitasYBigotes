const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Debe ser un formato de correo válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('confirmPassword').notEmpty().withMessage('Debes confirmar la constraseña'),
];

module.exports = validations;