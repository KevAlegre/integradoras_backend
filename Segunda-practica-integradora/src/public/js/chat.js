const socket = io();

const username = prompt("Ingrese nombre de usuario");
socket.emit("getUsername", username);

socket.on("dataMessage", (user) => {
    const span = document.getElementById("user-name");
    span.innerHTML = user.user;
    const chatBox = document.getElementById("chat-box");
    chatBox.addEventListener("keyup", (e) => {
        if(e.key === "Enter") {
            if (chatBox.value.trim().length > 0) {
                socket.emit("message", {user: username, message: chatBox.value});
                chatBox.value = "";
            };
        };
    });
    
    socket.on("messageLogs", (data) => {
        const logs = document.getElementById("message-logs");
        let messages = "";
        data.forEach((message) => {
            messages = `${message.user}: ${message.message}</br>`
        });
        logs.innerHTML += messages;
    }); 
});

