"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = require("fs");
const Message_1 = __importDefault(require("../Messages/Message"));
const channel_1 = __importDefault(require("../Channel/channel"));
class storagemanagement {
    //When inizilised Load all Files that are in the definied things
    //and this is where all the messages also are saved in as an
    //temp or RAM storage, it will only stay so long here until
    //The server is shut down
    constructor() {
        /*
        For Example, the CreateNewFragment function creates an new Element,
        that you can always access.
        Example:
        stm.CrNwSeFt("msg_Creator");
        stm.CrNwSeFt("msg_Content");
    
        ...
    
        stm.AddToFragment("msg_Creator", "Max");
        stm.AddToFragment("msg_Content", "Hello");
    
        ...
    
        return stm.GetFragment("msg_Creator", index); +   stm.GetFragment("msg_Content", index); //returns the creator with message: Max: Hello!
        */
        this.Fragments = {};
        this.loadedFragments = {};
        //Init programm
    }
    CreateNewSaveFragment(key, inizilisedSet = []) {
        //Create an new Element
        this.Fragments[key] = inizilisedSet;
    }
    GetFragmentNumber(key, fragment) {
        var fragments = this.Fragments[key];
        if (fragment == null)
            throw new Error(`The fragments of key [${key}] are not definied!`);
        const index = fragments.findIndex((ele) => { ele === fragment; });
        if (index === -1) {
            console.error(`There is no [${fragment}] in [${key}]`);
            return -1;
        }
        return index;
    }
    GetFragmentNumberByName(key, fragment) {
        var fragments = this.Fragments[key];
        if (fragment == null)
            throw new Error(`The fragments of key [${key}] are not definied!`);
        const index = fragments.findIndex((ele) => { ele.name === fragment; });
        if (index === -1) {
            console.error(`There is no [${fragment}] in [${key}]`);
            return -1;
        }
        return index;
    }
    AddToFragment(key, content) {
        if (!this.Fragments[key])
            // Falls das Fragment nicht existiert, initialisiere es als leeres Array
            throw new Error("The given key[" + key + "] dosnt exist!");
        this.Fragments[key].push(content);
    }
    ReplaceFragment(key, oldChannel, toReplace) {
        this.Fragments[key][this.GetFragmentNumber(key, oldChannel)] = toReplace;
    }
    ReplaceFragmentByName(key, oldChannel, toReplace) {
        this.Fragments[key][this.GetFragmentNumberByName(key, oldChannel)] = toReplace;
    }
    GetFragment(key, index) {
        return this.Fragments[key][index];
    }
    GetWholeFragment(key) {
        return this.Fragments[key];
    }
    SetFragment(key, msg) {
        this.Fragments[key] = msg;
    }
    HasFragmentLoadedSuccessfully(key) {
        return this.loadedFragments[key];
    }
    GetSingleFragment(key, channel) {
        const fragment = this.Fragments[key];
        // Überprüfe, ob das Fragment existiert
        if (!fragment) {
            throw new Error(`Cant find Key ${key}`);
        }
        // Finde den Index der zu löschenden Nachricht
        const index = fragment.findIndex((chl) => chl.name === channel);
        // Überprüfe, ob die Nachricht gefunden wurde
        if (index === -1) {
            throw new Error("Cant find channel");
        }
        return fragment[index];
    }
    DeleteFragment(key, channel) {
        const fragment = this.Fragments[key];
        // Überprüfe, ob das Fragment existiert
        if (!fragment) {
            console.error(`Fragment mit dem Schlüssel ${key} existiert nicht.`);
            return;
        }
        // Finde den Index der zu löschenden Nachricht
        const index = fragment.findIndex((chl) => chl.name === channel.name);
        // Überprüfe, ob die Nachricht gefunden wurde
        if (index === -1) {
            console.error('Kanal nicht im Fragment gefunden.');
            return;
        }
        // Entferne die Nachricht mit splice
        fragment.splice(index, 1);
        console.log(`Knal ${channel.name} wurde erfolgreich gelöscht.`);
    }
    // Diese Methode speichert das Fragment als JSON-Datei
    SaveFragmentToFile(key, filePath) {
        const fragment = this.Fragments[key];
        const jsonData = JSON.stringify(fragment.map(channel => ({
            name: channel.name,
            messages: channel.messages
        })), null, 2); // Serialisiere die Nachrichten als JSON
        (0, fs_1.writeFileSync)(filePath, jsonData); // Schreibe in die Datei
        console.log(`Fragment ${key} gespeichert in ${filePath}`);
    }
    // Diese Methode lädt ein Fragment von einer JSON-Datei
    LoadFragmentFromFile(key, filePath) {
        const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
        if ((0, fs_1.statSync)(filePath).size <= 10) {
            this.Fragments[key] = [];
            console.warn("messages.json Is empty!");
            this.loadedFragments[key] = false;
            return;
        }
        const messages = JSON.parse(data);
        var newChannels = [];
        messages.forEach((ele) => {
            //Go trough each message
            var newChannel = new channel_1.default(ele.name);
            var newMessages = [];
            ele.messages.forEach((msg) => {
                var newMessage = new Message_1.default(msg.Content, msg.Author, msg.Time); //Important is that it is uppercase because it is also in the string
                newMessages.push(newMessage);
            });
            newChannel.messages = newMessages;
            console.log(newChannel.messages);
            newChannels.push(newChannel);
        });
        this.Fragments[key] = newChannels;
        console.log(`Fragment ${key} von ${filePath} geladen`);
        this.loadedFragments[key] = true;
        return newChannels;
    }
}
module.exports = storagemanagement;
