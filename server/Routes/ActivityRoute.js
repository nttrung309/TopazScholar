const ActivityRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");

const { json } = require("express");

//Get all activities
ActivityRoute.get("/", (req, res) => {
  Activity.find({}).then((data) => {
    res.json(data);
  });
});

//Get activity by actID
ActivityRoute.get("/:actID", (req, res) => {
  const actID = req.params.actID;

  Activity.findOne({ actID: actID }).then((data) => {
    res.json(data);
  });
});

//Get activity by hostID
ActivityRoute.get("/get-by-host/:hostID", (req, res) => {
  const hostID = req.params.hostID;

  Activity.findOne({ hostID: hostID }).then((data) => {
    res.json(data);
  });
});

//Host new activity
ActivityRoute.post("/host", async (req, res) => {
  const actData = req.body;

  //Add new host infor
  const newHost = new Host({
    userID: actData.userID,
  });

  const hostData = await newHost.save({});
  console.log("Host added:", hostData);

  //Add new Activity
  const newAct = new Activity({
    hostID: hostData.hostID,
    name: actData.name,
    content: actData.content,
    category: actData.category,
    time: {
      startDate: actData.date[0],
      endDate: actData.date[1],
    },
    form: actData.form,
    address: actData.address,
    linkJoin: actData.linkJoin,
    faculty: actData.faculty,
    participants: actData.participants,
    maxParticipants: actData.maxParticipants,
    // mediaContent: {
    //   images: [...(actData.mediaContent?.images || [])],
    //   videos: [...(actData.mediaContent?.videos || [])],
    // },
    rule: actData.rule,
    activityStatus: actData.activityStatus,
    registerStatus: actData.registerStatus,
  });

  try {
    const data = await newAct.save({});

    //Update host data (actID)
    await Host.findOneAndUpdate(
      { hostID: hostData.hostID },
      { actID: data.actID },
      { new: true, upsert: true }
    );

    //Update user data (host)
    await User.findOneAndUpdate(
      { uid: actData.userID },
      {
        $push: { hostsID: data.actID },
      },
      { new: true, upsert: true }
    );
  } catch {
    res.json(null);
  }
  return res.status(200).send("Đăng ký thành công!");
});

//Update activity
ActivityRoute.post("/update", async (req, res) => {
  const actData = req.body;

  await Activity.findOne({ actID: actData.actID }).then((data) => {
    if (!data) {
      return res.json(data);
    } else {
      const data = Activity.findOneAndUpdate(
        {
          actID: actData.actID,
        },
        {
          hostID: actData.hostID,
          dateCreated: actData.dateCreated,
          lastModified: actData.lastModified,
          name: actData.name,
          content: actData.content,
          category: actData.category,
          address: actData.address,
          ggMap: actData.ggMap,
          entryFee: actData.entryFee,
          topic: actData.topic,
          form: actData.form,
          rule: actData.rule,
          rating: actData.rating,
          maxParticipants: actData.maxParticipants,
          registeredParticipants: actData.registeredParticipants,
          attendedParticipants: actData.attendedParticipants,
          commentsID: actData.commentsID,
          activityStatus: actData.activityStatus,
          registerStatus: actData.registerStatus,
          note: actData.note,
        },
        { new: true, upsert: true }
      ).then((data) => {
        res.json(data);
      });
    }
  });
});

module.exports = ActivityRoute;
