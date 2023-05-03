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

app.get("/users/:id/:userId", async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).send(users);
  } catch (error) {
    /*     console.log(error); */
    response.status(500).send("Internal server error");
  }
});

app.get("/homeuser", async (request, response) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 4 } }]);
    response.status(200).send(users);
  } catch (error) {
    /*     console.log(error); */
    response.status(500).send("Internal server error");
  }
});


app.get("/profile/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      response.status(404).send("The user was not found.");
    } else {
      response.status(200).send(user);
    }
  } catch (error) {
    /*     console.log(error); */
    response.status(500).send("Internal server error");
  }
});

app.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProfile = req.body;

  try {
    const updatedProfileData = await User.findByIdAndUpdate(id, updatedProfile, { new: true });
    res.json(updatedProfileData);
  } catch (err) {
    /*     console.log(error); */
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.post("/register", async (request, response) => {
  try {
    const hashPassword = await bcrypt.hash(request.body.password, 10);
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashPassword,
    });
    try {
      const result = await user.save();
      response.status(201).send({
        message: "User registered successfully",
      });
    } catch (error) {
      /* console.log("Something went wrong", error); */
      response.status(400).send({
        message: "Could not register user",
      });
    }
  } catch (error) {
    response.status(500).send({
      message: "Server Error",
    });
  }
});


app.post("/login", async (request, response) => {
  const user = await User.findOne({ $or: [{ email: request.body.email }, { username: request.body.username }] });
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
  } else {
    response.status(404).send({
      message: "Bad Request",
    });
  }
});
// make a post request for follow user

app.post('/users/:id/followers', async (req, res) => {
  try {
    const userId = req.params.id;
    const followerId = req.body.followerId;
    /* console.log(followerId); */

    // Add the follower ID to the followers array of the user
    const user = await User.findById(userId);
    user.followers.push(followerId);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    /* console.log(error.message); */
    res.sendStatus(500);
  }
});


app.get('/tweets', async (req, res) => {
  try {
    const tweets = await Post.find().lean().exec();
    if (!tweets) {
      /* console.error('Error: No tweets found'); */
      res.status(500).send('Error fetching tweets');
      return;
    }

    const tweetPromises = tweets.map(async (tweet) => {
      const user = await User.findById(tweet.author);
      if (!user) {
        /* console.error(`Error: User not found for tweet with author: ${tweet.author}`); */
        return null;
      }

      return {
        ...tweet,
        username: user.username,
        nickname: user.nickname,
      };
    });

    const tweetsWithUserInfo = await Promise.all(tweetPromises);
    const filteredTweetsWithUserInfo = tweetsWithUserInfo.filter(tweet => tweet !== null);
    res.send(filteredTweetsWithUserInfo);
  } catch (error) {
    /*  console.error('Error:', error); */
    res.status(500).send('Error fetching tweets');
  }
});


app.post("/tweet", authMiddleware, async (request, response) => {
  try {
    const { userId } = request.user;
    const { text } = request.body;
    const tweet = new Post({ author: userId, text });
    const savedTweet = await tweet.save();
    response.status(201).send(savedTweet);
  } catch (error) {
    /*     console.log(error); */
    response.status(500).send("Internal server error");
  }
});



export default app;