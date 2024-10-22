const socket = io();  // Verbindet sich automatisch mit dem Server

// Nachrichten vom Server empfangen und anzeigen
socket.on('chat message', (msg, channel) => {
    DisplayNewMessage(msg, "Tanaka", "-0:00");
  });

socket.on('delete all messages', ()=>{
    DeleteAllMessages();
});
  