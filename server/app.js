import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "./db/post.js";
import authMiddleware from "./auth.js";
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

app.get("/users/:id", async (request, response) =>
{
  try
  {
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error)
  {
    console.log(error);
    response.status(500).send("Internal server error");
  }
});
app.get("/homeuser", async (request, response) =>
{
  try
  {
    const users = await User.aggregate([ { $sample: { size: 4 } } ]);
    response.status(200).send(users);
  } catch (error)
  {
    console.log(error);
    response.status(500).send("Internal server error");
  }
});


app.get("/profile/:id", async (request, response) =>
{
  try
  {
    const user = await User.findById(request.params.id);
    if (!user)
    {
      response.status(404).send("The user was not found.");
    } else
    {
      response.status(200).send(user);
    }
  } catch (error)
  {
    console.log(error);
    response.status(500).send("Internal server error");
  }
});

app.post("/profile/:id", async (req, res) =>
{
  const { id } = req.params;
  const updatedProfile = req.body;

  try
  {
    // TODO: Update the user profile in the database with the new data
    // ...

    // Return a success response
    res.status(200).send('Profile updated successfully');
  } catch (err)
  {
    // Return an error response if something went wrong
    console.error(err);
    res.status(500).send('Error updating profile');
  }
})


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
  const user = await User.findOne({ $or: [ { email: request.body.email }, { username: request.body.username } ] });
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

app.get("/tweets", async (req, res) =>
{
  try
  {
    const tweets = await Post.find({});
    res.status(200).send(tweets);
  } catch (error)
  {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/tweet", authMiddleware, async (request, response) =>
{
  try
  {
    const { userId } = request.user;
    const { text } = request.body;
    const tweet = new Post({ author: userId, text });
    const savedTweet = await tweet.save();
    response.status(201).send(savedTweet);
  } catch (error)
  {
    console.log(error);
    response.status(500).send("Internal server error");
  }
});



export default app;