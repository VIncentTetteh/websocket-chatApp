const socket = io('http://localhost:3000')
const messageform = document.getElementById('form-wrapper');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message');
const otherMessage = document.getElementById('other-message')

messageform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    appendOtherMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = '';
})


const name = prompt("Enter your name")
appendOtherMessage("You joined")
socket.emit('new-user-joined', name)

socket.on("chat-message", data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", name =>{
    appendMessage(`${name} connected`)
})
socket.on("user-disconnected", name =>{
    appendMessage(`${name} disconnected`)
})
function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageContainer.append(messageElement);
}
function appendOtherMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    otherMessage.append(messageElement);
}
 