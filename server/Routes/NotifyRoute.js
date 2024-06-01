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
	console.log(req.params.id);
	Notify.find({ recvID: req.params.id })
	  .sort({ sendTime: -1 }) // Sắp xếp giảm dần theo sendTime
	  .then(data => {
		res.json(data);
	  })
	  .catch(err => {
		res.status(500).json({ error: err.message });
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

//Send notify
NotifyRoute.post("/mark-read", async (req, res) => {
	const notifyData = req.body;
	console.log(notifyData);
	if(notifyData.reqType == 'single'){
		const updatedNotify = await Notify.findOneAndUpdate(
			{notifyID: notifyData.notifyID},
			{ $set: { isRead: true } },
			{ new: true } // Trả về tài liệu đã cập nhật
		);
		
		res.send(updatedNotify);
	}
	else{
		const result = await Notify.updateMany(
			{ recvID: notifyData.recvID },
			{ $set: { isRead: true } }
		  );

		  // Tìm và trả về các thông báo đã cập nhật
		  const updatedNotify = await Notify.find({ recvID: notifyData.recvID }).sort({ sendTime: -1 });
	  
		  res.json({updatedNotify, type: 'all'});
	}
});

NotifyRoute.post("/test-send-mail", async (req, res) => {
	SendEmail('yuukina0909@gmail.com', 'Test gửi mail', 'Sắp có hoạt động mới!');
	res.status(200).send('send rùi');
});


module.exports = NotifyRoute;
