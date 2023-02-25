const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price').notEmpty().withMessage('El precio es obligatorio').bail().isNumeric().withMessage('Debe ser un número'),
    body('discount').notEmpty().withMessage('El descuento es obligatorio').bail().isNumeric().withMessage('Debe ser un número'),
];

module.exports = validations;