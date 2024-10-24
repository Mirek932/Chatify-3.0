"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class accountDetails {
    constructor(email = "example@example.com", username = "Client-Tanaka", password = "1234") {
        this.Email = email;
        this.Username = username;
        this.Password = password;
    }
}
exports.default = accountDetails;
