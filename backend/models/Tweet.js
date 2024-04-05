import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: { type: "string", required: true },
    description: { type: "string", required: true, max: 255 },
    likes: { type: Array, defaultValue: [] },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }], // Array of tweet IDs for replies
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);
