"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http")); // Um den Server für Socket.io bereitzustellen
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
//Moduels
const WYMWS_1 = __importDefault(require("./controllers/Checking/WYMWS"));
const Encrypt_1 = __importDefault(require("./controllers/Encryption/Encrypt"));
const Save_1 = __importDefault(require("./controllers/Saveing/Save"));
const Paths_1 = __importDefault(require("./controllers/Saveing/Paths"));
const StorageManagement_1 = __importDefault(require("./controllers/Saveing/StorageManagement"));
const Message_1 = __importDefault(require("./controllers/Messages/Message"));
const channel_1 = __importDefault(require("./controllers/Channel/channel"));
const User_1 = __importDefault(require("./controllers/Account/User"));
const Colors_1 = __importDefault(require("./controllers/Colors/Colors"));
const CurrentDate_1 = __importDefault(require("./controllers/Date/CurrentDate"));
const wymws = new WYMWS_1.default();
const encrypt = new Encrypt_1.default();
const save = new Save_1.default();
const paths = new Paths_1.default();
const stm = new StorageManagement_1.default();
var MainChannel = new channel_1.default("Hub");
const colors = new Colors_1.default();
const CurrentDate = new CurrentDate_1.default();
function InitPathes() {
    paths.addPath("messages", "../frontend/storage/message/messages.json");
}
function InitStorage() {
    stm.LoadFragmentFromFile("messages", paths.getPath("messages"));
    if (stm.HasFragmentLoadedSuccessfully("messages"))
        MainChannel = stm.GetSingleFragment("messages", "Hub");
}
InitPathes();
InitStorage();
// Express-Setup
const app = (0, express_1.default)();
const port = 3000;
// HTTP-Server erstellen
const server = http_1.default.createServer(app);
// Socket.io-Server einrichten
const io = new socket_io_1.Server(server);
// Statische Dateien bereitstellen
app.use(express_1.default.static(path_1.default.join(__dirname, '../backend')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
function LaodAllMessages(socket) {
    socket.emit("delete all messages");
    MainChannel.UpdateSocket(socket);
}
function DeleteAllMessages(channel) {
    stm.GetWholeFragment("messages").forEach(ele => {
        if (ele === channel) {
            ele.DeleteAllMessages();
        }
    });
}
var Users = {};
// WebSocket-Verbindungen verwalten
io.on('connection', (socket) => {
    colors.log(colors.FgGray + socket.id);
    //Load All Messages
    LaodAllMessages(socket);
    //Ask the socket for the username
    socket.emit("Get User");
    socket.on("Submit User", (name, passcode, email) => {
        var newUser = new User_1.default(name, passcode, email);
        Users[name] = newUser;
        colors.log(`${socket.id} got ${name}`);
    });
    /*
    IMPORTANT: REMOVE IF YOU SUPPORT CHATROOMS
    */
    MainChannel.OnlineMember(socket);
    /*
    IMPORTANT: REMOVE IF YOU SUPPORT CHATROOMS
    */
    socket.on('change channel', (channel) => {
    });
    // Nachricht vom Client empfangen
    socket.on('chat message', (msg, author, channel = MainChannel) => {
        colors.log(colors.FgGray + `Recived Message: ${msg} finding ${author} with id ${socket.id}`);
        var newMessage = new Message_1.default(msg, Users[author].Name, CurrentDate.FormatedCD, channel.name);
        newMessage.Check();
        channel.SendMessage(newMessage);
        stm.ReplaceFragmentByName("messages", channel.name, channel);
        stm.SaveFragmentToFile("messages", paths.getPath("messages"));
        // Nachricht an alle Clients senden
        //io.emit('chat message', msg);
    });
    socket.on('encrypt', (msg) => {
        io.emit('encrypt', msg);
    });
    // Benutzer trennt die Verbindung
    socket.on('disconnect', () => {
        /*
        IMPORTANT: REMOVE IF YOU SUPPORT CHATROOMS
        */
        MainChannel.OnlineMember(socket);
        /*
        IMPORTANT: REMOVE IF YOU SUPPORT CHATROOMS
        */
        colors.log(colors.BgGray + `The user ${socket.id} left`);
    });
});
// Server starten
server.listen(port, () => {
    colors.log(colors.Bright + `Server läuft auf http://localhost:${port}`);
});
