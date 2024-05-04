//node server which will handle socketio connection
const io = require('socket.io')(9000, { cors: { origin: "*" } });
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log('user connected', name);
        users[socket.id] = name;
        socket.broadcast.emit('user joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
    });
});