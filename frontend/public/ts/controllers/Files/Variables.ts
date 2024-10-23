import { Socket } from "socket.io-client";

class variables{
    public form: HTMLInputElement;
    public sendButton: HTMLButtonElement;
    public socket: Socket;

    constructor(
        form:HTMLInputElement,
        sendButton: HTMLButtonElement,
        socket: Socket
    ){
        this.form = form;
        this.sendButton = sendButton;
        this.socket = socket;
    }
}
export default variables;