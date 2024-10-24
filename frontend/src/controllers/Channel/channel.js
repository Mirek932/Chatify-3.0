"use strict";
require("socket.io");
class channel {
    constructor(name) {
        this.messages = [];
        this.onlineSockets = [];
        this.name = name;
    }
    SendMessage(msg) {
        this.messages.push(msg);
        this.UpdateAllClients(msg.content);
    }
    UpdateSocket(socket) {
        this.messages.forEach((ele) => {
            socket.emit("chat message", ele.content, this.name);
        });
    }
    UpdateAllClients(msg) {
        this.onlineSockets.forEach((ele) => {
            ele.emit("chat message", msg, this.name);
        });
    }
    OnlineMember(sct) {
        this.onlineSockets.push(sct);
    }
    OfflineMember(sct) {
        this.onlineSockets.push(sct);
    }
    DelteMessage(msg) {
        //find the index
        const index = this.messages.findIndex((ele) => { if (msg === ele)
            ele; });
        if (index === -1) {
            console.error('Didnt found message.');
            return;
        }
        this.messages.splice(index, 1);
    }
    DeleteAllMessages() {
        this.messages = [];
    }
}
module.exports = channel;
