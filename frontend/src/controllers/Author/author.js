"use strict";
class author {
    constructor(user, currentChannel) {
        this.WrittenMessages = [];
        this.User = user;
        this.CurrentChannel = currentChannel;
    }
}
module.exports = author;
