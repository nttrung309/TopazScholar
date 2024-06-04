// @ts-nocheck
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT; // Port 5000
const dbUrl = process.env.MONGO_URL;

//Import Routes
const UserRoute = require("./Routes/UserRoute");
const ActivityRoute = require("./Routes/ActivityRoute");
const HostRoute = require("./Routes/HostRoute");
const CommentRoute = require("./Routes/CommentRoute");
const NotifyRoute = require("./Routes/NotifyRoute");
const MessageRoute = require("./Routes/MessageRoute");

//Import Socket
const SocketHandler = require("./Socket/SocketHandler");
const { ScheduleAutoEmail } = require("./Cron/AutoMail");

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Use routes
app.use("/api/user", UserRoute);
app.use("/api/activity", ActivityRoute);
app.use("/api/host", HostRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/notify", NotifyRoute);
app.use("/api/message", MessageRoute);

//Socket
SocketHandler(io);

//Auto Mail
ScheduleAutoEmail();

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
