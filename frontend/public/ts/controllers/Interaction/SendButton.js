"use strict";
//const form = document.getElementById('messageInput') as HTMLInputElement;
//const sendButton = document.getElementById('sendButton') as HTMLButtonElement;
Object.defineProperty(exports, "__esModule", { value: true });
// Nachricht senden, wenn der Button geklickt wird
class buttons {
    constructor(variables, ad) {
        this.ad = ad;
        this.variables = variables;
        this.IniziliseButtons();
    }
    IniziliseButtons() {
        this.variables.sendButton.addEventListener('click', () => {
            const message = this.variables.form.value;
            if (message) {
                this.variables.socket.emit('chat message', message, this.ad.Username); // Nachricht an den Server senden
                this.variables.form.value = ''; // Eingabefeld leeren
            }
        });
    }
}
exports.default = buttons;
