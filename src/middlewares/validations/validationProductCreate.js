const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 5}).withMessage('Debe tener al menos 5 caracteres'),
    body('short_description').notEmpty().withMessage('La descripcion breve es obligatoria').bail()
        .isLength({ min: 20}).withMessage('Debe tener al menos 20 caracteres'), 
    body('price').notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric().withMessage('Debe ser un número'),
    body('discount').notEmpty().withMessage('El descuento es obligatorio').bail()
        .isNumeric().withMessage('Debe ser un número'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];  
    
        if (!file) {
            req.body.image = "default.jpg";
            return true;
        }
        let fileExtension = path.extname(file.originalname);
        
        if(!acceptedExtensions.includes(fileExtension.toLowerCase())) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
        }
        return true
    })
];

module.exports = validations;