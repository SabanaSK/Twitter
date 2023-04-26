import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./db/user.js";
import dbConnect from "./db/database.js";

const app = express();
dbConnect();

app.use((req, res, next) =>
{
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

app.get("/", (request, response, next) =>
{
  response.json({ message: "Hey! This is your server response!" });
  next();
});
app.get("/test", (request, response, next) =>
{
  response.json({ message: "Hey! testing!" });
  console.log('testing');
  next();
});

app.post("/register", async (request, response) =>
{
  try
  {
    const hashPassword = await bcrypt.hash(request.body.password, 10);
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashPassword,
    });
    try
    {
      const result = await user.save();
      response.status(201).send({
        message: "User registered successfully",
      });
    } catch (error)
    {
      console.log("Something went wrong", error);
      response.status(400).send({
        message: "Could not register user",
      });
    }
  } catch (error)
  {
    response.status(500).send({
      message: "Server Error",
    });
  }
});


app.post("/login", async (request, response) =>
{
  const user = await User.findOne({ email: request.body.email });
  if (user)
  {
    const match = await bcrypt.compare(request.body.password, user.password);
    if (!match)
    {
      response.status(404).send({
        message: "Bad Request",
      });
    } else
    {
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
          username: user.username,
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
  } else
  {
    response.status(404).send({
      message: "Bad Request",
    });
  }
});


export default app;