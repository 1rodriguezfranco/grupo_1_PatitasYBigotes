const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const authController = {
    login: (req, res) => res.render ("login"),

    register: (req, res) => {
        res.render ("register")
    },

    store:(req, res)=> {
        const usersList = getUserList(usersFilePath);
        const user = {
			id: usersList.length > 0 ? usersList[usersList.length -1].id + 1 : 1,
			name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            image: req.file?.filename ? req.file.filename : "default-image.png",
		}
        usersList.push(user);

        fs.writeFileSync(usersFilePath, JSON.stringify(usersList, null, 2));

		return res.redirect("/login");
    },

    register2: (req, res) => res.render ("register2"),
    newpassword: (req, res) => res.render ("newpassword"),
    recoverpassword: (req, res) => res.render ("recoverpassword"), 
}

function getUserList(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = authController;