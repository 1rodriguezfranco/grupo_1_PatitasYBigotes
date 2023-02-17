const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require(path.join(__dirname, '../models/Users.js'));


const authController = {
    login: (req, res) => res.render ("login"),

    register: (req, res) => res.render ("register"),

    store:(req, res)=> {        
        const resultValidation = validationResult(req);
        let userInDB = User.findByField('email', req.body.email);
        if (resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else if(userInDB){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        } else{
            let userToCreate = {
                ...req.body,
                avatar: req.file.filename
            }
            User.create(userToCreate);
            return res.redirect("/");
        }
    },

    register2: (req, res) => res.render ("register2"),
    newpassword: (req, res) => res.render ("newpassword"),
    recoverpassword: (req, res) => res.render ("recoverpassword"), 
}

module.exports = authController;