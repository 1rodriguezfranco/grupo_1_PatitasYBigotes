function userLogged(req, res, next){
    if(req.session.userLogged){
        return res.redirect("/auth/profile")
    }
    next()
};

module.exports = userLogged;