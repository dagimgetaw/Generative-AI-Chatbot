const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/UserData");

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json("No user exists!");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json("Password is incorrect");

    res.json("success");
  } catch (err) {
    res.status(500).json("Server error");
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json("Username already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({ username, email, password: hashedPassword });

    res.json("success");
  } catch (err) {
    res.status(500).json("Error creating user");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
