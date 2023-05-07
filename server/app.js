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
//All Users
app.get("/users", async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send("Internal server error");
  }
});
app.get("/users/profile/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.status(200).send(user);
    } else {
      response.status(404).send("User not found");
    }
  } catch (error) {
    response.status(500).send("Internal server error");
  }
});

app.get('/search', async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
    /*     console.log("hello") */
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching users');
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
app.get('/hashtags/:hashtag', async (req, res) => {
  const hashtag = req.params.hashtag;

  try {
    const posts = await Post.find({ hashtags: { $regex: hashtag, $options: 'i' } });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching posts');
  }
});

async function getTrendingHashtags() {
  try {
    const hashtags = await Post.aggregate([
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }, 
    ]);

    return hashtags.map((hashtag) => ({
      name: hashtag._id,
      tweets: `${hashtag.count}k`,
    }));
  } catch (error) {
    throw new Error("Failed to fetch trending hashtags");
  }
}


app.get("/trending-hashtags", async (req, res) => {
  try {
    const trendingHashtags = await getTrendingHashtags();
    res.status(200).send(trendingHashtags);
  } catch (error) {
    //console.error(error);
    res.status(500).send("Internal server error");
  }
});




// Get tweets for a specific user
app.get('/tweets/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userTweets = await Post.find({ author: userId });

    const user = await User.findById(userId);
    const tweetsWithUserInfo = userTweets.map(tweet => ({
      ...tweet._doc,
      username: user.username,
      nickname: user.nickname,
    }));

    res.send(tweetsWithUserInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching user tweets');
  }
});
app.post("/tweet", authMiddleware, async (request, response) => {
  try {
    const { userId } = request.user;
    const { text } = request.body;

    // Extract hashtags from the tweet text
    const hashtags = text.match(/#\w+/g) || [];

    const tweet = new Post({
      author: userId,
      text: text,
      hashtags: hashtags // Add hashtags to the Post model
    });

    const savedTweet = await tweet.save();
    response.status(201).send(savedTweet);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
  }
});

//SubmittedTweet
app.get("/users/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId);

    if (user) {
      response.status(200).send(user);
    } else {
      response.status(404).send("User not found");
    }
  } catch (error) {
    /*     console.log(error); */
    response.status(500).send("Internal server error");
  }
});
//follow
app.post("/users/:id/follow", async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.body.currentUserId;
    const action = req.body.action; // "follow" or "unfollow"
    const [currentUser, userToFollow] = await Promise.all([
      User.findById(currentUserId),
      User.findById(userId),
    ]);
    /* console.log("CurentUser", currentUser, userToFollow)
    console.log("CurrentUserId", currentUserId, userId) */
    if (action === "follow") {

      if (!currentUser.following.some((id) => id.equals(userToFollow._id))) {
        currentUser.following.push(userToFollow._id);
      }
      if (!userToFollow.followers.some((id) => id.equals(currentUser._id))) {
        userToFollow.followers.push(currentUser._id);
      }
    } else if (action === "unfollow") {

      currentUser.following = currentUser.following.filter(
        (id) => !id.equals(userToFollow._id)
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => !id.equals(currentUser._id)
      );
    } else {
      res.status(400).json({ message: "Invalid action" });
      return;
    }
    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.status(200).json({ message: `Successfully ${action}ed the user` });
  } catch (error) {
    /*    console.error(error); */
    res.status(500).json({ message: "An error occurred while updating the follow relationship" });
  }
});

app.get('/tweets/:userId/following', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user.following.length === 0) {
      const randomTweets = await Post.aggregate([{ $match: { author: { $ne: userId } } }, { $sample: { size: 10 } }]);
      res.send(randomTweets);
    } else {
      const followingTweets = await Post.find({ author: { $in: user.following } });
      res.send(followingTweets);
    }
  } catch (error) {
    /*     console.error('Error:', error); */
    res.status(500).send('Error fetching tweets');
  }
});


export default app;





