const Message = require("../../Models/Message");

const ContactSocket = (socket, io) => {
    socket.on('sendMessage', (data) => {
        const msgData = data;
        console.log(msgData);

        const newMessage = new Message(msgData);

        newMessage.save({}).then(data => {
            console.log(data);
            io.emit('newMessage', data);
        })
    });
}

module.exports = ContactSocket;