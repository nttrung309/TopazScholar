const CommentRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");
const Comment = require("../Models/Comment");

const { json } = require("express");

//Get all host
CommentRoute.get("/", (req, res) => {
	Comment.find({}).then(data => {
		res.json(data);
	});
});

//Update host info
CommentRoute.post("/post", async (req, res) => {
	const cmtData = req.body;

	const newComment = new Comment(cmtData);

	newComment.save({}).then(data => {
		res.send(data);
	})
})

module.exports = CommentRoute;
