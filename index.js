let socket;

function start() {
    socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('inputUpdate', (msg) => {
        console.log("Received inputUpdate: " + msg);
        document.getElementById("textInput").value = msg;
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
}


function inputUpdate() {
    let text = document.getElementById("textInput").value;
    socket.emit('inputUpdate', text);
}
