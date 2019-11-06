//github pages version (static) - causes errors but displays few examples of infos and messages, 
//to fix before using/hosting dynamically: remove try/catch, remove lines 17-23, uncomment lines 26-28
//to make working on mobile on localhost, change localhost to wifi ip address line below and in index.html 
try{const socket = io('http://localhost:3000');}
catch(e){
    console.log(e);
}
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

messageInput.focus();

let scrollbarWidth = messageContainer.offsetWidth - messageContainer.clientWidth;
messageContainer.style.paddingRight = scrollbarWidth  + "px";

alert(`This is static version of website for github pages hosting. It means you cannot interact with the server, thus sending messages is not possible. Nonetheless script was changed to display few examples of infos and messages to present the design and static features like showing message time on click/hover or scrolling the message container.`);
appendInfo('You');
appendInfo('John');
appendMessage('You: Hello!', true);
appendMessage('John: Hi!');
appendMessage("You: What's up?", true);
appendMessage("John: It's all good man");

/*
const name = prompt('Enter your name:') || 'Anon';
appendInfo('You joined');
socket.emit('new-user-ts', name);
*/
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message-ts', message);
    appendMessage('You: ' + message, true);
    messageInput.value = '';
})

socket.on('send-chat-message-fs', data => {
    appendMessage(data.user + ": " + data.message);
})

socket.on('new-user-fs', name => {
    appendInfo(name + ' joined');
})

socket.on('user-disconnected-fs', name => {
    appendInfo(name + ' left the chat');
})

function appendInfo(info){
    const newInfo = document.createElement('h5');
    newInfo.innerText = info + " at " + getFormattedCurrentTime();
    messageContainer.appendChild(newInfo);
}

function appendMessage(message, isMine = false){
    const singleMessageContainer = document.createElement('div');
    const newMessage = document.createElement('div');
    singleMessageContainer.appendChild(newMessage);

    const dateFormatted = getFormattedCurrentTime();
    let tooltipSpan = "<span>"+ dateFormatted + "</span>";

    if(isMine){
        singleMessageContainer.className = "my-message";
        tooltipSpan = "<span class='my-tooltip'>"+ dateFormatted + "</span>";
    }

    singleMessageContainer.style.marginRight = (-scrollbarWidth) + "px";
    newMessage.innerText = message;
    newMessage.innerHTML += tooltipSpan;
    messageContainer.appendChild(singleMessageContainer);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function getFormattedCurrentTime(){
    const date = new Date();

    let currentHours = date.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    
    let currentMinutes = date.getMinutes();
    currentMinutes = ("0" + currentMinutes).slice(-2);

    return currentHours + ":" + currentMinutes;

}