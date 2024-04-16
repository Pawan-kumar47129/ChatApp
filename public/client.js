const socket = io()
let name;
let input = document.querySelector('#input')
console.log(input);
let send = document.querySelector('#send')
let messageArea = document.querySelector('.message_area')
console.log(messageArea);
do {
    fullname = prompt('Please enter your name: ')
} while(!fullname) 

send.addEventListener('click', (e) => {
        let msg=input.value
        console.log(msg);
        sendMessage(msg)
    
})

function sendMessage(message) {
    let msg = {
        user: fullname,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    input.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


