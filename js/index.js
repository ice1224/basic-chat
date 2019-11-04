const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

messageInput.focus();
messageContainer.style.paddingRight = messageContainer.offsetWidth - messageContainer.clientWidth;

//const name = prompt('Enter your name:') || 'Anon';
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
    newInfo.innerText = info;
    messageContainer.appendChild(newInfo);
}

function appendMessage(message, isMine = false){
    const singleMessageContainer = document.createElement('div');
    const newMessage = document.createElement('div');
    const toolTip = document.createElement('span');
    toolTip.innerText = "dsfdsf";
    newMessage.appendChild(toolTip);
    singleMessageContainer.appendChild(newMessage);
    if(isMine){
        singleMessageContainer.className = "my-message";
    }
    newMessage.innerText = message;
    messageContainer.appendChild(singleMessageContainer);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}