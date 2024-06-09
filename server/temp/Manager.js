const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv").config();
const UserRoute = require("./Routes/UserRoute");
const app = express();
const port = process.env.PORT; // Chọn số cổng tùy ý
const dbUrl = process.env.MONGO_URL;
const User = require("./Models/User");

app.use(express.json());
app.use(morgan("combined"));
app.use(cors()); // Enable CORS for all routes

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Định nghĩa Schema
// const userSchema = new mongoose.Schema({
//     userID: String,
//     userName: String
// });

// const meow = mongoose.model("users", userSchema);

// app.get('/user', (req, res) => {
//     const sampleUser = {
//         id: 1,
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         role: 'student'
//     };

//     res.json(sampleUser);
// });

//Get All
app.get("/allusers", (req, res) => {
  const query = req.query.id;
  console.log(query);
  if (query === "meow") {
    User.find({}).then((err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else {
    res.send("Not found!");
  }
});

//Add
app.get("/user/add/:id/:username", (req, res) => {
  const id = req.params.id;
  const userName = req.params.username;
  const favorAcitivitiesID = ["001", "meow", "ahihi"];

  const newUser = new User({
    uid: id,
    name: userName,
    favorAcitivitiesID: favorAcitivitiesID,
  });
  try {
    newUser.save({}).then((result) => {
      console.log("User added:", result);
      res.status(500).json(result);
    });
  } catch {
    res.json("Add user failed!");
  }
});

//Find one
app.get("/user/find/:id", (req, res) => {
  const id = req.params.id;

  User.findOne({ userID: id }).then((result) => {
    console.log(result);
    res.status(500).json(result);
  });
});

//Update Username
app.get("/user/changeusername/:id/:newusername", (req, res) => {
  const { id, newusername: newUsername } = req.params;

  const updateData = { userName: newUsername };

  User.findOneAndUpdate(
    { userID: id }, // Điều kiện để tìm user cần cập nhật
    updateData, // Dữ liệu mới bạn muốn cập nhật
    { new: true }
  ).then((err, updatedUser) => {
    console.log(err);
    console.log(updatedUser);
    res.status(500).json(err);
  });
});

app.use("/api/user", UserRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/user`);
});
