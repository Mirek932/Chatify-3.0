import { io, Socket } from "socket.io-client";
import display from "../Display/Display";
import accountDetails from "../Account/AccountDetails";


class socketmessages {
  private socket: Socket;  // Verbindet sich automatisch mit dem Server
  private messages: HTMLElement;
  private accountDetails:accountDetails;

  constructor(display: display, messages: HTMLElement, ad:accountDetails) {
    this.socket = io();
    this.IniziliseSocketListeners(display);
    this.messages = messages;
    this.accountDetails = ad;
  }
  private IniziliseSocketListeners(display: display) {
    // Nachrichten vom Server empfangen und anzeigen
    this.socket.on('chat message', (msg: string, channel: string) => {
      display.DisplayNewMessage(msg, this.messages, "Tanaka", "-0:00");
    });

    this.socket.on('delete all messages', () => {
      display.DeleteAllMessages(this.messages);
    });

    this.socket.on("Get User", ()=>{
      setTimeout(()=>{
        this.socket.emit("Submit User", this.accountDetails.Username, this.accountDetails.Password, this.accountDetails.Email);
    }, 500);
  })
  }
}
export default socketmessages;