const authController = {
    login: (req, res) => res.render ("login"),
    register: (req, res) => res.render ("register"),
    newpassword: (req, res) => res.render ("newpassword"),
    recoverpassword: (req, res) => res.render ("recoverpassword"), 
}


module.exports = authController;