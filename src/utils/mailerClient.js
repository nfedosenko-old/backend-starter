const socket = require('socket.io-client')(`http://localhost:${process.env.MAILER_PORT}`);

socket.open();

socket.on('disconnect', () => {
    socket.open();
});

module.exports = socket;