const HostRoute = require("express").Router();
const Host = require("../Models/Host");

const { json } = require("express");

//Get all host
HostRoute.get("/", (req, res) => {
  Host.find({}).then((data) => {
    res.json(data);
  });
});

//Get host by activity id
HostRoute.get("/:actID", (req, res) => {
  const actID = req.params.actID;
  Host.findOne({ actID: actID }).then((data) => {
    res.json(data);
  });
});

//Update host info
HostRoute.post("/update", async (req, res) => {
  const hostData = req.body;

  const result = await Host.findOneAndUpdate(
    { hostID: hostData.hostID },
    hostData,
    { new: true, upsert: true }
  );

  res.send(result);
});

module.exports = HostRoute;
