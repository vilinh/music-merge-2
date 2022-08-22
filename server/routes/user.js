const express = require("express");
const jwtoken = require("../utils/jwt");
const router = express.Router();
const Users = require("../models/Users");

router.get("/user", jwtoken.verifyJWT, async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await Users.findOne({ _id: userId });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/email", jwtoken.verifyJWT, async (req, res, next) => {
  try {
    const userId = req.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("user has been updated");
  } catch (err) {
    throw err;
  }
});
