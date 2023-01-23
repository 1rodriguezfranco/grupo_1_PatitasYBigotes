const authController = {
    login: (req, res) => res.render ("login"),
    register: (req, res) => res.render ("register"),
    register2: (req, res) => res.render ("register2"),
    newpassword: (req, res) => res.render ("newpassword"),
    recoverpassword: (req, res) => res.render ("recoverpassword"), 
}


module.exports = authController;