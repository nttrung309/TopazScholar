const MessageRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");
const Comment = require("../Models/Comment");
const Notify = require("../Models/Notify");
const Message = require("../Models/Message");

const { json } = require("express");

//Get all messages
MessageRoute.get("/:uid", async (req, res) => {
	const uid = req.params.uid;
	Message.find({
        $or: [
            { senderID: uid },
            { recvID: uid }
        ]
    })
    .sort({ sendTime: 1 })  // Sắp xếp tăng dần theo sendTime
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
})

//Send message
MessageRoute.post("/send", async (req, res) => {
	const msgData = req.body;

	const newMessage = new Message(msgData);

	newMessage.save({}).then(data => {
		res.send(data);
	})
})




module.exports = MessageRoute;
