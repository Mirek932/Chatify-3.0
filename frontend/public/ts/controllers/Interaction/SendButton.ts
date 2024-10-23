//const form = document.getElementById('messageInput') as HTMLInputElement;
//const sendButton = document.getElementById('sendButton') as HTMLButtonElement;

import accountDetails from "../Account/AccountDetails";
import variables from "../Files/Variables";

// Nachricht senden, wenn der Button geklickt wird
class buttons{
  variables: variables;
  ad: accountDetails;

  constructor (variables: variables, ad: accountDetails)
  {
    this.ad = ad;
    this.variables = variables;
    this.IniziliseButtons();
  }
  IniziliseButtons()
  {
    this.variables.sendButton.addEventListener('click', () => {
      const message = this.variables.form.value;
      if (message) {
        this.variables.socket.emit('chat message', message, this.ad.Username);  // Nachricht an den Server senden
        this.variables.form.value = '';  // Eingabefeld leeren
      }
    });
  }
}
export default buttons;