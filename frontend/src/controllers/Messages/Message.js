"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const WYMWS_1 = __importDefault(require("../Checking/WYMWS"));
var wymws = new WYMWS_1.default();
class message {
    constructor(content, author, time, chnl) {
        this.Content = `<${author} | ${time}>` + content;
        this.Author = author;
        this.Time = time;
        this.Channel = chnl || "MainChannel";
        if (!chnl)
            console.warn("Please give the Channel in the constructor!");
    }
    SetChannel(channel) {
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
        return this.Time; //
    }
    Verify() {
        throw new Error("Not yet implemented");
    }
    Report() {
        throw new Error("Not yet implemented");
    }
    Check() {
        if (wymws.Words.includes(this.content.toLocaleLowerCase()))
            this.Content = "######";
    }
    Delete(stm) {
        /*
            For the Deletion of this message, you first have to Update it inside of the
            StorageManger and resave the file. :)
        */
        this.FindChannel(this.Channel, stm).DelteMessage(this); //deletes this message
        //stm.DeleteFragment("messages", this.Channel); //deletes this message
    }
    FindChannel(channel, stm) {
        var selectedChannel = stm.GetSingleFragment("messages", channel);
        return selectedChannel;
    }
    Reply() {
        throw new Error("Not yet implemented");
    }
}
module.exports = message;
