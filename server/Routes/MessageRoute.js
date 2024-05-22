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

//Get notify by uid
MessageRoute.get("/:id", (req, res) => {
	Notify.find({notifyID: req.params.id}).then(data => {
		res.json(data);
	});
});

//Send notify
MessageRoute.post("/send", async (req, res) => {
	const notifyData = req.body;

	const newNotify = new Notify(notifyData);

	newNotify.save({}).then(data => {
		res.send(data);
	})
})

module.exports = MessageRoute;
