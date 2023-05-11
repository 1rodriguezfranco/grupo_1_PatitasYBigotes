const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require(path.join(__dirname, "../../database/models"));

const authController = {
    
    register: (req, res) => res.render ("./auth/register"),

    store: async (req, res)=> {
        let resultValidation = validationResult(req);
        let userInDB = false;
        let allUsers = await db.User.findAll();
        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].email == req.body.email){
                userInDB = true;
            };
        };
        if (resultValidation.errors.length > 0){
            return res.render('./auth/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else if(userInDB){
            return res.render('./auth/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        } else{
            if(req.body.password != req.body.confirmPassword){
                return res.render('./auth/register', {
                    errors: {
                        confirmPassword: {
                            msg: 'No coincide con la contraseña ingresada'
                        }
                    },
                    oldData: req.body
                });
            };
            let userAvatar = "defaultAvatar.jpg";
            if(req.file){
                userAvatar = req.file.filename;
            };
            let userToCreate = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: userAvatar
            };
            db.User.create(userToCreate)
                .then(()=>{ return res.redirect("/auth/login") })
        }
    },

    register2: (req, res) => res.render ("./auth/register2"),

    login: (req, res) => res.render ("./auth/login"),

    loginProcess: async (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("./auth/login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let allUsers = await db.User.findAll();
        let validUserEmail = false;
        let validUserPassword = false;
        let validUser;
        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].email == req.body.email){
                validUserEmail = true
                validUser = allUsers[i];
            };
        };
        if(bcrypt.compareSync(req.body.password, validUser.password)){
            validUserPassword = true;
        };
        if(validUserEmail && validUserPassword){
            delete validUser.password
            req.session.userLogged = validUser;
            if(req.body.rememberUser){
                res.cookie('userEmail', req.body.email, { maxAge: (999 * 999) * 999})
            }
            return res.redirect("/auth/profile")
        } else {
            return res.render("./auth/login", {
                errors: {
                    userLogin: {
                        msg: "El usuario o la constraseña no coinciden con un usuario registrado"
                    }
                },
                oldData: req.body
            });
        };
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    newpassword: (req, res) => res.render ("./auth/newpassword"),
    recoverpassword: (req, res) => res.render ("./auth/recoverpassword"), 

    profile: (req, res) => { 
        res.render('./auth/profile', { user : req.session.userLogged})
    },

    edit: async (req, res) => {
        let user = await db.User.findByPk(req.params.id);
        return res.render("./auth/edit", {user});
    },

    update: async (req, res) => {
        let userAvatar = "defaultAvatar.jpg";
        if(req.file){
            userAvatar = req.file.filename;
        };
        let user = await db.User.findByPk(req.params.id);
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("./auth/edit", {
                errors: resultValidation.mapped(),
                oldData: req.body,
                user
            })
        } else {
            db.User.update(
				{
					first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: user.password,
                    avatar: userAvatar
				},
				{
					where: {id: req.params.id}
				}
			)
			.then(()=>{
				return res.redirect("/auth/profile");
			})
        }
    }
}

module.exports = authController;