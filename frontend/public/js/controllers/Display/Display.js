const messages = document.getElementById('messages');

function DisplayNewMessage(messageContent, messageCreator, time)
{
    const li = document.createElement('li');
    li.textContent = messageContent;
    messages.appendChild(li);
}
function DeleteAllMessages()
{
    messages.innerHTML = "";
}