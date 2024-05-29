const NotifyRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");
const Comment = require("../Models/Comment");
const Notify = require("../Models/Notify");

const { SendEmail } = require("../Cron/AutoMail");

const { json } = require("express");

//Get notify by uid
NotifyRoute.get("/:id", (req, res) => {
	Notify.find({notifyID: req.params.id}).then(data => {
		res.json(data);
	});
});

//Send notify
NotifyRoute.post("/send", async (req, res) => {
	const notifyData = req.body;

	const newNotify = new Notify(notifyData);

	newNotify.save({}).then(data => {
		res.send(data);
	})
});

NotifyRoute.post("/test-send-mail", async (req, res) => {
	SendEmail('yuukina0909@gmail.com', 'Test gửi mail', 'Sắp có hoạt động mới!');
	res.status(200).send('send rùi');
});


module.exports = NotifyRoute;
