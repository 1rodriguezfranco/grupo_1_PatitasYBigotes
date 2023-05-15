const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const Users = {
    userFile: path.join(__dirname, '../data/usersDataBase.json'),

    userList: function(){
        return JSON.parse(fs.readFileSync(this.userFile, 'utf-8'))
    },

    findAll: function(){
        return this.userList();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id === id);
        return userFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text);
        return userFound;
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUserId = allUsers.pop();
        if(lastUserId){
            return lastUserId.id + 1;
        } else{
            return 1;
        };
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData,
            password: bcryptjs.hashSync(userData.password, 10),
            confirmPassword: bcryptjs.hashSync(userData.confirmPassword, 10),
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.userFile, JSON.stringify(allUsers, null, 2));
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id)
        fs.writeFileSync(this.userFile, JSON.stringify(finalUsers, null, 2));
    }
}

module.exports = Users;