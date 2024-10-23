import { io } from "socket.io-client";
class socketmessages {
    constructor(display, messages) {
        this.socket = io();
        this.IniziliseSocketListeners(display);
        this.messages = messages;
    }
    IniziliseSocketListeners(display) {
        // Nachrichten vom Server empfangen und anzeigen
        this.socket.on('chat message', (msg, channel) => {
            display.DisplayNewMessage(msg, this.messages, "Tanaka", "-0:00");
        });
        this.socket.on('delete all messages', () => {
            display.DeleteAllMessages(this.messages);
        });
        this.socket.on("Get User", () => {
            this.socket.emit("Submit User", Username, Password, Email);
        });
    }
}
export default socketmessages;
