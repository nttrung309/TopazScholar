const HostRoute = require("express").Router();
const Host = require("../Models/Host");

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

//Update host by activity id
HostRoute.post("/update", async (req, res) => {
  let data = req.body;
  try {
    if (data.regStatus !== "Denied") data = { ...data, denyReason: "" };
    console.log(data.actID);
    const result = await Host.findOneAndUpdate(
      { actID: data.actID },
      { ...data, responseTime: new Date() },
      {
        new: true,
        upsert: true,
      }
    );
    res.send({ statuss: "Success", host: result });
  } catch (error) {
    res.send({ status: "Error", error: error });
  }
});

module.exports = HostRoute;
