import express from "express";
import { verifytoken } from "../verfytoken.js";
import {
  createTweet,
  deleteTweet,
  likeAndDislike,
  getalltweets,
  getusertweets, getExploreTweets,replyToTweet
} from "../controllers/tweet.js";
const router = express.Router();

//create tweet
router.post("/", verifytoken, createTweet);

// Delete tweet
router.delete("/:id", verifytoken, deleteTweet);

//like and dislike tweet
router.put("/:id/like", likeAndDislike);

// all timeline entries
router.get("/timeline/:id", getalltweets);

//get user own tweets
router.get("/user/all/:id", getusertweets);

//explore feature
router.get("/explore", getExploreTweets);

//posting replies to tweet
router.post("/:id/reply", verifytoken, replyToTweet);
export default router;
