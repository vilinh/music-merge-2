const express = require("express");
const app = express();
const port = 8800;
const cors = require("cors");
const mongoose = require("mongoose");
const { CustomError } = require("./utils/createError");
const Users = require("./models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
app.use(cors());
app.use(express.json());


const User = require("./models/Users");
const spotifyRouter = require("./routes/spotify");
const deezerRouter = require("./routes/deezer");

app.use("/spotify", spotifyRouter);
app.use("/deezer", deezerRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username) {
      return next(new CustomError("Missing username field"));
    }
    if (!password) {
      return next(new BadRequestError("Missing password field."));
    }
    if (password === "123") {
      /* allow 123 as a pw while developing */
    } else if (password.length < 6) {
      return next(new CustomError("Password must be at least 6 characters"));
    }

    if (await User.findOne({ username })) {
      return next(new CustomError("User already exists."));
    }

    const user = new User({ username, password, email });
    await user.save();
    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

app.post("/verify-token", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT, (err) => {
    if (err) {
      res.status(401).send("Failed to authenticate");
    } else {
      res.status(200).send("Successfully Authenticated");
    }
  });
});

const getUserId = () => {
  return app.locals.userId;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB();
  console.log(`app listening on port ${port}`);
});

exports.getUserId = getUserId;
module.exports = app;
