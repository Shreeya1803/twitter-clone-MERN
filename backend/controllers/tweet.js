import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

//create a tweet
export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save(); //save the tweet
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError(500, err);
  }
};
//delete a tweet
export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("tweet deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};
//like and dislike a tweet
export const likeAndDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet  liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet  disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};
//all tweet
export const getalltweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followerstweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId }); //finding tweet using all follwer id and store in followersTweets
      })
    );
    res.status(200).json(userTweets.concat(...followerstweets));
  } catch (err) {
    handleError(500, err);
  }
};
//get user own tweet
export const getusertweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1, //lastest tweet on top
    });
    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};

//explore tweet getExploreTweets
export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({ likes: { $exists: true } }).sort(
      { likes: -1 }
    ); //get all the tweets that have likes and most like tweets on the top
    
    
    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};

//replies to tweet
export const replyToTweet = async (req, res, next) => {
  try {
    // Fetch the parent tweet
    const parentTweet = await Tweet.findById(req.params.id);

    // Create a new tweet for the reply
    const newReply = new Tweet({
      userId: req.user._id, //  req.user._id contains the ID of the user replying
      description: req.body.description //  the request body contains the description of the reply
    });

    // Save the reply tweet
    const savedReply = await newReply.save();

    // Add the ID of the reply to the parent tweet's 'replies' array
    parentTweet.replies.push(savedReply._id);
    await parentTweet.save();

    res.status(200).json(savedReply);
  } catch (err) {
    handleError(500, err);
  }
};