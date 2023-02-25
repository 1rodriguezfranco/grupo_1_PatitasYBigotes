const path = require('path');
const User = require(path.join(__dirname, '../../models/Users'));

function userLoggedApp(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userInCookie = User.findByField('email', emailInCookie);

    if(userInCookie){
        req.session.userLogged = userInCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
};
 
module.exports = userLoggedApp;