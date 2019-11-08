const io = require('socket.io')(process.env.PORT || 3000)
const users = {}

io.on('connection', socket => {
    socket.on('new-user-ts', name => {
        users[socket.id] = name;
        socket.broadcast.emit('new-user-fs', name);
    })
    socket.on('send-chat-message-ts', message => {
        socket.broadcast.emit('send-chat-message-fs', {user: users[socket.id], message: message});
    })

    socket.on('disconnect',() => {
        socket.broadcast.emit('user-disconnected-fs', users[socket.id]);
        delete users[socket.id];
    })
})
