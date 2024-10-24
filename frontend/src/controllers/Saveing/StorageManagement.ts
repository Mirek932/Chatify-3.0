import { readFileSync, statSync, writeFileSync } from "fs";
import message from "../Messages/Message";
import IMessage from "../Messages/interfaces/IMessage";
import channel from "../Channel/channel";
import { error } from "console";

class storagemanagement {
    //When inizilised Load all Files that are in the definied things
    //and this is where all the messages also are saved in as an
    //temp or RAM storage, it will only stay so long here until
    //The server is shut down
    constructor() {
        //Init programm
    }
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
    private Fragments: {[id: string] : channel[]} = {};
    public CreateNewSaveFragment(key: string, inizilisedSet: channel[] = [])
    {
        //Create an new Element
        this.Fragments[key] = inizilisedSet;
    }
    public GetFragmentNumber(key: string, fragment: channel)
    {
        var fragments: channel[] = this.Fragments[key];
        if(fragment == null)
            throw new Error(`The fragments of key [${key}] are not definied!`);
        const index: number = fragments.findIndex((ele)=> ele === fragment );
        if(index === -1)
        {
            console.error(`GFN: There is no [${fragment}] in [${key}]`);
            return -1;
        }
        return index;
    }
    public GetFragmentNumberByName(key: string, fragment: string)
    {
        var fragments: channel[] = this.Fragments[key];
        if(fragment == null)
            throw new Error(`The fragments of key [${key}] are not definied!`);
        const index: number = fragments.findIndex((ele)=> ele.name === fragment );
        if(index === -1)
        {
            console.error(`GFNBN: There is no [${fragment}] in [${key}]`);
            return -1;
        }
        return index;
    }
    public AddToFragment(key: string, content: channel)
    {
        if (!this.Fragments[key]) 
            // Falls das Fragment nicht existiert, initialisiere es als leeres Array
            throw new Error("The given key["+key+"] dosnt exist!")
        console.log(`Adding to [${key}](mostly messages) to the Fragments with the channel name: ${content.name}`)
        this.Fragments[key].push(content);
        console.log(`success fully added it here is ${key}:  ${this.Fragments[key][this.GetFragmentNumberByName(key, content.name)]}`)
    }
    public ReplaceFragment(key: string, oldChannel: channel, toReplace: channel)
    {
        this.Fragments[key][this.GetFragmentNumber(key, oldChannel)] = toReplace;
    }
    public ReplaceFragmentByName(key: string, oldChannel: string, toReplace: channel)
    {
        if(this.GetFragmentNumberByName(key, oldChannel) === -1)
        {
            console.log(`The Channel ${oldChannel} dosnt exist in the key ${key} yet. Creating an new one!`)
            this.AddToFragment(key, toReplace);
            return;
        }
        this.Fragments[key][this.GetFragmentNumberByName(key, oldChannel)] = toReplace;
    }
    public GetFragment(key: string, index: number)
    {
        return this.Fragments[key][index];
    }
    public GetWholeFragment(key: string)
    {
        return this.Fragments[key];
    }
    public SetFragment(key: string, msg: channel[])
    {
        this.Fragments[key] = msg;
    }
    public HasFragmentLoadedSuccessfully(key: string)
    {
        return this.loadedFragments[key];
    }
    public GetSingleFragment(key: string, channel: string)
    {
        const fragment = this.Fragments[key];
    
        // Überprüfe, ob das Fragment existiert
        if (!fragment) {
            throw new Error(`Cant find Key ${key}`);
        }

        // Finde den Index der zu löschenden Nachricht
        const index = fragment.findIndex(
            (chl) => chl.name === channel
        );
    
        // Überprüfe, ob die Nachricht gefunden wurde
        if (index === -1) {
            throw new Error("Cant find channel")
        }

        return fragment[index];
    }
    public DeleteFragment(key: string, channel: channel) {
        const fragment = this.Fragments[key];
    
        // Überprüfe, ob das Fragment existiert
        if (!fragment) {
            console.error(`Fragment mit dem Schlüssel ${key} existiert nicht.`);
            return;
        }
    
        // Finde den Index der zu löschenden Nachricht
        const index = fragment.findIndex(
            (chl) => chl.name === channel.name
        );
    
        // Überprüfe, ob die Nachricht gefunden wurde
        if (index === -1) {
            console.error('Kanal nicht im Fragment gefunden.');
            return;
        }
    
        // Entferne die Nachricht mit splice
        fragment.splice(index, 1);
    
        console.log(`Knal ${channel.name} wurde erfolgreich gelöscht.`);
    }
    private loadedFragments: {[id: string] : boolean} = {};
    // Diese Methode speichert das Fragment als JSON-Datei
    public SaveFragmentToFile(key: string, filePath: string) {
        const fragment: channel[] = this.Fragments[key];
        const jsonData = JSON.stringify(fragment.map(channel=>({
            name: channel.name,
            messages: channel.messages
        })), null, 2);  // Serialisiere die Nachrichten als JSON
        writeFileSync(filePath, jsonData);  // Schreibe in die Datei
        console.log(`Dass Fragment ${key} gespeichert in ${filePath}`);
    }

    // Diese Methode lädt ein Fragment von einer JSON-Datei
    public LoadFragmentFromFile(key: string, filePath: string) {
        const data = readFileSync(filePath, 'utf-8');
        if(statSync(filePath).size <= 10) 
        {
            this.Fragments[key] = [];
            console.warn("messages.json Is empty!");
            this.loadedFragments[key] = false;
            return;
        }
        const messages = JSON.parse(data);
        var newChannels: channel[] = [];
        messages.forEach((ele: channel) => {
            //Go trough each message
            var newChannel: channel = new channel(ele.name);
            var newMessages: message[] = [];
            ele.messages.forEach((msg)=>{
                var newMessage = new message(msg.Content, msg.Author, msg.Time); //Important is that it(Content) is uppercase because it is also in the string
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

export = storagemanagement;