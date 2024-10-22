import author from "../Author/author";
import channel from "../Channel/channel";
import WYMWS from "../Checking/WYMWS";
import storagemanagement from "../Saveing/StorageManagement";
import IMessage from "./interfaces/IMessage";

var wymws = new WYMWS();

class message implements IMessage{
    Content: string;
    Author: string;
    Time: string;
    private Channel: string;
    constructor (content: string, author: string, time: string, chnl?: string) {
        this.Content = `<${author} | ${time}>` + content;
        this.Author = author;
        this.Time = time;
        this.Channel = chnl || "MainChannel";
        if(!chnl) console.warn("Please give the Channel in the constructor!");
    }
    public SetChannel(channel: string)
    {
        this.Channel = channel;
    }
    get channel() {
        return this.Channel;
    }
    get author() {
        return this.Author;
      }
    get content() {
        return this.Content;
    }
    get time() {
        return this.Time;//
    }
    public Verify()
    {
        throw new Error("Not yet implemented");
    }
    public Report()
    {
        throw new Error("Not yet implemented");
    }
    public Check()
    {
        if(wymws.Words.includes(this.content.toLocaleLowerCase()))
            this.Content = "######";
    }
    public Delete(stm: storagemanagement)
    {
        /*
            For the Deletion of this message, you first have to Update it inside of the
            StorageManger and resave the file. :)
        */
        this.FindChannel(this.Channel, stm).DelteMessage(this);//deletes this message
        //stm.DeleteFragment("messages", this.Channel); //deletes this message
    }
    public FindChannel(channel:string, stm: storagemanagement)
    {
        var selectedChannel : channel = stm.GetSingleFragment("messages", channel);
        return selectedChannel;
    }
    public Reply()
    {
        throw new Error("Not yet implemented");
    }
}
export = message;