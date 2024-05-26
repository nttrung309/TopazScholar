const ContactSocket = require("./ContactSocket/ContactSocket")

const SocketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        //Add socket here
        ContactSocket(socket, io);
    });
};

module.exports = SocketHandler;
