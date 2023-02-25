const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require(path.join(__dirname, '../models/Users.js'));
const bcryptjs = require('bcryptjs');


const authController = {
    
    register: (req, res) => res.render ("register"),

    store:(req, res)=> {        
        let resultValidation = validationResult(req);
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
            let userAvatar = "defaultAvatar.jpg"
            if(req.file){
                userAvatar = req.file.filename;
            }
            let userToCreate = {
                ...req.body,
                avatar: userAvatar
            }
            User.create(userToCreate);
            return res.redirect("/auth/login");
        }
    },

    register2: (req, res) => res.render ("register2"),

    login: (req, res) => res.render ("login"),

    loginProcess: (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        let userToLogin = User.findByField('email', req.body.email);
        let userToLoginPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (!userToLogin || !userToLoginPassword){
            res.render("login", {
                errors: {
                    userLogin: {
                        msg: "El usuario o la constraseña no coinciden con un usuario registrado"
                    }
                }
            })
        };
        if (userToLogin && userToLoginPassword){
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if(req.body.rememberUser){
                res.cookie('userEmail', req.body.email, { maxAge: (999 * 999) * 999})
            }
        };
        return res.redirect("/auth/profile");
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    newpassword: (req, res) => res.render ("newpassword"),
    recoverpassword: (req, res) => res.render ("recoverpassword"), 

    profile: (req, res) => { res.render
        ('profile', { user : req.session.userLogged})
    }
}

module.exports = authController;