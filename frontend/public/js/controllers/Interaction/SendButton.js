const form = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Nachricht senden, wenn der Button geklickt wird
sendButton.addEventListener('click', () => {
  const message = form.value;
  if (message) {
    socket.emit('chat message', message);  // Nachricht an den Server senden
    form.value = '';  // Eingabefeld leeren
  }
});
