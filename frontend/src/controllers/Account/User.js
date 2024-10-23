"use strict";
class user {
    constructor(name, password, email) {
        this.Name = name;
        this.Password = password;
        this.Email = email;
    }
    DeleteUser() {
        throw new Error("Not yet implemented");
    }
    ChangeName(newName) {
        throw new Error("Not yet implemented");
    }
    ChangePasword(newPassword) {
        throw new Error("Not yet implemented");
    }
}
module.exports = user;
