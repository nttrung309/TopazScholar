const HostRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");

const { json } = require("express");

//Get all host
HostRoute.get("/", (req, res) => {
	Host.find({}).then((data) => {
		res.json(data);
	});
});

//Update host info
HostRoute.post("/update", async (req, res) => {
	const hostData = req.body;

	const result = await Host.findOneAndUpdate(
		{hostID: hostData.hostID},
		hostData,
		{ new: true, upsert: true }
	);

	res.send(result);
})

module.exports = HostRoute;
