

class display {
    DisplayNewMessage(messageContent : string, messages:HTMLElement, messageCreator:string, time:string)
    {
        const li = document.createElement('li');
        li.textContent = messageContent;
        messages.appendChild(li);
    }
    DeleteAllMessages(messages:HTMLElement)
    {
        messages.innerHTML = "";
    }
}
export default display;