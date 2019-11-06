const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

messageInput.focus();

let scrollbarWidth = messageContainer.offsetWidth - messageContainer.clientWidth;
messageContainer.style.paddingRight = scrollbarWidth  + "px";

const name = prompt('Enter your name:') || 'Anon';
appendInfo('You joined');
socket.emit('new-user-ts', name);

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