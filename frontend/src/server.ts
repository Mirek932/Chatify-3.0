import express from 'express';
import http from 'http';  // Um den Server für Socket.io bereitzustellen
import { Server } from 'socket.io';
import path from 'path';

//Moduels
import WYMWS from './controllers/Checking/WYMWS';
import Encrypt from './controllers/Encryption/Encrypt';
import Save from './controllers/Saveing/Save';
import Paths from './controllers/Saveing/Paths';
import storagemanagement from './controllers/Saveing/StorageManagement';
import message from './controllers/Messages/Message';
import channel from './controllers/Channel/channel';
import user from './controllers/Account/User';
import Colors from './controllers/Colors/Colors';
import currentDate from './controllers/Date/CurrentDate';

const wymws = new WYMWS();
const encrypt = new Encrypt();
const save = new Save();
const paths = new Paths();
const stm = new storagemanagement();
var MainChannel = new channel("Hub");
const colors = new Colors();
const CurrentDate = new currentDate();

function InitPathes()
{
  paths.addPath("messages", "../frontend/storage/message/messages.json");
}
function InitStorage()
{
  stm.LoadFragmentFromFile("messages", paths.getPath("messages"));
  if(stm.HasFragmentLoadedSuccessfully("messages"))
    MainChannel = stm.GetSingleFragment("messages", "Hub");
}
InitPathes();
InitStorage();

// Express-Setup
const app = express();
const port = 3000;

// HTTP-Server erstellen
const server = http.createServer(app);

// Socket.io-Server einrichten
const io = new Server(server);

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '../backend')));
app.use(express.static(path.join(__dirname, '../public')));

function LaodAllMessages(socket: any)
{
  socket.emit("delete all messages");
  MainChannel.UpdateSocket(socket);
}
function DeleteAllMessages(channel:channel)
{
  stm.GetWholeFragment("messages").forEach(ele => {
    if(ele === channel)
    {
      ele.DeleteAllMessages();
    }
  });
}

var Users: {[id: string]:user} = {};
// WebSocket-Verbindungen verwalten
io.on('connection', (socket) => {
  colors.log(colors.FgGray + socket.id);
  //Load All Messages
  LaodAllMessages(socket);
  //Ask the socket for the username
  socket.emit("Get User");
  socket.on("Submit User", (name: string, passcode: string, email: string) =>{
    var newUser:user = new user(name, passcode, email);
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

  socket.on('change channel', (channel: channel)=>{

  });
  // Nachricht vom Client empfangen
  socket.on('chat message', (msg: string, author: string, channel:channel = MainChannel) => {
    colors.log(colors.FgGray + `Recived Message: ${msg} finding ${author} with id ${socket.id}`);
    var newMessage = new message(msg, Users[author].Name, CurrentDate.FormatedCD, channel.name);
    newMessage.Check();
    channel.SendMessage(newMessage);
    stm.ReplaceFragmentByName("messages", channel.name, channel);
    stm.SaveFragmentToFile("messages", paths.getPath("messages"));
    
    // Nachricht an alle Clients senden
    //io.emit('chat message', msg);
  });

  socket.on('encrypt', (msg: string) => {
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
  colors.log(colors.Bright+ `Server läuft auf http://localhost:${port}`);
});
