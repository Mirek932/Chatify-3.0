"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class display {
    DisplayNewMessage(messageContent, messages, messageCreator, time) {
        const li = document.createElement('li');
        li.textContent = messageContent;
        messages.appendChild(li);
    }
    DeleteAllMessages(messages) {
        messages.innerHTML = "";
    }
}
exports.default = display;
