import { io, Socket } from "socket.io-client";
import display from "../Display/Display";
import accountDetails from "../Account/AccountDetails";
import channel from "../Channel/channel";


class socketmessages {
  private socket: Socket;  // Verbindet sich automatisch mit dem Server
  private messages: HTMLElement;
  private accountDetails:accountDetails;
  private channel: channel;

  constructor(display: display, messages: HTMLElement, ad:accountDetails, Channel: channel) {
    this.socket = io();
    this.IniziliseSocketListeners(display);
    this.messages = messages;
    this.accountDetails = ad;
    this.channel = Channel;
  }
  private IniziliseSocketListeners(display: display) {
    // Nachrichten vom Server empfangen und anzeigen
    this.socket.on('chat message', (msg: string, channel: string) => {
      console.log(channel, " -> " + this.channel.Current);
      if(channel.toLocaleLowerCase() == this.channel.Current.toLowerCase())
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