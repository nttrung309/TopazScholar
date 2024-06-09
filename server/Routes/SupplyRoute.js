const SupplyRoute = require("express").Router();
const SupplyType = require("../Models/SupplyType");
const Supply = require("../Models/Supply");

//Get all detail supplies
SupplyRoute.get("/", async (req, res) => {
  Supply.find({}).then((data) => {
    res.json(data);
  });
});

//Get all supply types
SupplyRoute.get("/type", async (req, res) => {
  SupplyType.find({}).then((data) => {
    res.json(data);
  });
});

//Get one supply type
SupplyRoute.get("/type/:id", async (req, res) => {
  const id = req.params.id;
  SupplyType.findOne({ typeID: id }).then((data) => {
    res.json(data);
  });
});

//Create new supply
SupplyRoute.post("/add", async (req, res) => {
  const data = req.body;
  try {
    const supply = new Supply(data);
    const result = supply.save({});
    res.send({ status: "Success", type: result });
  } catch (error) {
    console.log("error:" + error);
    res.send({ status: "Error", error: error });
  }
});

//Update supply
SupplyRoute.post("/update", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const result = await Supply.findOneAndUpdate(
      { supplyID: data.supplyID },
      data,
      {
        new: true,
      }
    );

    res.send({ status: "Success", supply: result });
  } catch (error) {
    console.log("error:" + error);
    res.send({ status: "Error", error: error });
  }
});

//Create new supply type
SupplyRoute.post("/addType", async (req, res) => {
  const data = req.body;
  try {
    SupplyType.find({ name: data.name }).then((typeData) => {
      if (typeData.length > 0) res.send({ status: "Existed" });
      else {
        const type = new SupplyType(data);
        const result = type.save({});
        res.send({ status: "Success", type: result });
      }
    });
  } catch (error) {
    console.log("error:" + error);
    res.send({ status: "Error", error: error });
  }
});

module.exports = SupplyRoute;
