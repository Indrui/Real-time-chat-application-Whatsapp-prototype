
const socket = io('http://localhost:9000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('send-container');
const messageContainer = document.querySelector(".container");
const append = (message, position) => {
    const messagelement = document.createElement('div');
    messagelement.innerText = message;
    messagelement.classList.add('message')
    messagelement.classList.add(position);
    messageContainer.append(messagelement)
};
form.addEventListener('submit', (event) => {
    const message = messageInput.value;
    append(`you:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    event.preventDefault();
});
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});
socket.on('recieve', data => {
    append(`${data.message}:${data.user}`, 'left');
});