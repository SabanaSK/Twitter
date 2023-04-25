import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./db/user.js";
import dbConnect from "./db/database.js";

const app = express();
dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", async (request, response) => {
  try {
    const hashPassword = await bcrypt.hash(request.body.password, 10);
    const user = new User({
      email: request.body.email,
      password: hashPassword,
    });
    try {
      const result = await user.save(); // User.insertOne
    } catch (error) {
      // User sent wrong data
      console.log("Something went wrong", error);
      response.status(404).send({
        message: "Could not register user",
      });
    }
  } catch (error) {
    // Bcrypt not working
    response.status(500).send({
      message: "Server Error",
    });
  }
});

app.post("/login", async (request, response) => {
  const user = await User.findOne({ email: request.body.email });
  if (user) {
    const match = await bcrypt.compare(request.body.password, user.password);
    if (!match) {
      response.status(404).send({
        message: "Bad Request",
      });
    } else {
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      response.status(200).send({
        message: "User found",
        data: user,
        token,
      });
    }
  } else {
    response.status(404).send({
      message: "Bad Request",
    });
  }
});

export default app;