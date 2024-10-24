import { Socket } from "socket.io";
import message from "../Messages/Message";
import  "socket.io";

class channel{
    public messages : message[] = [];
    public readonly name : string;
    private onlineSockets : Socket[] = [];

    constructor(name:string){
        this.name = name;
    }
    public SendMessage(msg : message)
    {
        this.messages.push(msg);
        this.UpdateAllClients(msg.content);
    }
    public UpdateSocket(socket:Socket)
    {
        this.messages.forEach((ele)=>{
            socket.emit("chat message", ele.content, this.name);
        });
    }
    UpdateAllClients(msg:string)
    {
        this.onlineSockets.forEach((ele:Socket)=>{
            ele.emit("chat message", msg, this.name);
        })
    }
    public OnlineMember(sct:Socket)
    {
        this.onlineSockets.push(sct);
    }
    public OfflineMember(sct:Socket)
    {
        this.onlineSockets.push(sct);
    }
    public DelteMessage(msg:message)
    {
        //find the index
        const index = this.messages.findIndex((ele)=>{if(msg === ele)ele});
        if (index === -1) {
            console.error('Didnt found message.');
            return;
        }
        this.messages.splice(index, 1);
    }
    public DeleteAllMessages()
    {
        this.messages = [];
    }
}

export = channel;