"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
class socketmessages {
    constructor(display, messages, ad, Channel) {
        this.socket = (0, socket_io_client_1.io)();
        this.IniziliseSocketListeners(display);
        this.messages = messages;
        this.accountDetails = ad;
        this.channel = Channel;
    }
    IniziliseSocketListeners(display) {
        // Nachrichten vom Server empfangen und anzeigen
        this.socket.on('chat message', (msg, channel) => {
            if (channel.toLocaleLowerCase() == this.channel.Current.toLowerCase())
                display.DisplayNewMessage(msg, this.messages, "Tanaka", "-0:00");
        });
        this.socket.on('delete all messages', () => {
            display.DeleteAllMessages(this.messages);
        });
        this.socket.on("Get User", () => {
            setTimeout(() => {
                this.socket.emit("Submit User", this.accountDetails.Username, this.accountDetails.Password, this.accountDetails.Email);
            }, 500);
        });
    }
}
exports.default = socketmessages;
