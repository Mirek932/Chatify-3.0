"use strict";
class accountManager {
    constructor() {
        this.Accounts = [];
    }
    GetAccoutByName(name) {
        const index = this.Accounts.findIndex((ele) => { ele.Name === name; });
        if (index === -1)
            throw new Error(`Cant find user by name: ${name}`);
        return index;
    }
}
module.exports = accountManager;
