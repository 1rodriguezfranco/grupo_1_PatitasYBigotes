const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('first_name').notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min:2 }).withMessage('Debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({ min:2 }).withMessage('Debe tener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un formato de correo válido'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];  
    
        if (!file) {
            req.body.avatar = "default.jpg";
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