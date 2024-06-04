const ActivityRoute = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const User = require("../Models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
const unlinkAsync = promisify(fs.unlink);

//Get all activities
ActivityRoute.get("/", (req, res) => {
  Activity.find({})
    .sort({ dateCreated: 1 })
    .then((data) => {
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
ActivityRoute.post("/host", upload.array("images"), async (req, res) => {
  const actData = req.body;
  //@ts-ignore
  const paths = req.files.map((file) => file.path);
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
      startDate: actData.startDate,
      endDate: actData.endDate,
    },
    form: actData.form,
    address: actData.address,
    linkJoin: actData.linkJoin,
    faculty: actData.faculty,
    participants: actData.participants,
    maxParticipants: actData.maxParticipants,
    mediaContent: {
      images: [...(paths || [])],
      videos: [...(actData?.videos || [])],
    },
    rule: actData.rule === "" ? "Không có" : actData.rule,
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
ActivityRoute.post("/update", upload.array("images"), async (req, res) => {
  const actData = req.body;

  await Activity.findOne({ actID: actData.actID }).then((data) => {
    console.log(actData.remainImages);
    console.log(data.mediaContent.images);

    // @ts-ignore
    let paths = req.files.map((file) => file.path);
    if (actData?.remainImages?.length > 0)
      paths = paths.concat(actData.remainImages);

    // Delete file
    const deleteFile = data.mediaContent.images.filter(
      (image) => !actData.remainImages.includes(image)
    );
    deleteFile.forEach(async (path) => await unlinkAsync(path));

    if (!data) {
      return res.json(data);
    } else {
      const data = Activity.findOneAndUpdate(
        {
          actID: actData.actID,
        },
        {
          hostID: actData.hostID,
          name: actData.name,
          content: actData.content,
          category: actData.category,
          time: {
            startDate: actData.startDate,
            endDate: actData.endDate,
          },
          form: actData.form,
          address: actData.address,
          linkJoin: actData.linkJoin,
          faculty: actData.faculty,
          participants: actData.participants,
          maxParticipants: actData.maxParticipants,
          mediaContent: {
            images: [...(paths || [])],
            videos: [...(actData?.videos || [])],
          },
          rule: actData.rule === "" ? "Không có" : actData.rule,
          rating: actData.rating,
          registeredParticipants: actData.registeredParticipants,
          attendedParticipants: actData.attendedParticipants,
          commentsID: actData.commentsID,
          activityStatus: actData.activityStatus,
          registerStatus: actData.registerStatus,
        },
        { new: true, upsert: true }
      ).then((data) => {
        res.json(data);
      });
    }
  });
});

//Update status
ActivityRoute.post("/updateStatus", async (req, res) => {
  const actData = req.body;
  console.log(actData);

  await Activity.findOne({ actID: actData.actID }).then((data) => {
    if (!data) {
      return res.json(data);
    } else {
      let registerStatus;
      if (!actData.registerStatus) registerStatus = "";
      else registerStatus = actData.registerStatus;

      Activity.findOneAndUpdate(
        {
          actID: actData.actID,
        },
        {
          activityStatus: actData.activityStatus,
          registerStatus: registerStatus,
        },
        { new: true, upsert: true }
      ).then((data) => {
        res.json(data);
      });
    }
  });
});

module.exports = ActivityRoute;
