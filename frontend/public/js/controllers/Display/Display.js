class display {
    DisplayNewMessage(messageContent, messages, messageCreator, time) {
        const li = document.createElement('li');
        li.textContent = messageContent;
        messages.appendChild(li);
    }
    DeleteAllMessages(messages) {
        messages.innerHTML = "";
    }
}
export default display;
