const path = require('path');
const db = require(path.join(__dirname, "../../../database/models"));

function userLoggedApp (req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    db.User.findAll()
        .then((allUsers) => {

            for(let i = 0; i < allUsers.length; i++){
                if(allUsers[i].email == emailInCookie){
                    req.session.userLogged = allUsers[i];
                };
            };

            if(req.session.userLogged){
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            };
        
            next();
        });
};
 
module.exports = userLoggedApp;