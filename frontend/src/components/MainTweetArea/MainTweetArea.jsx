import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import axios from "axios";
import { useSelector } from "react-redux";

const MainTweetArea = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitTweet = await axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
      });
      window.location.reload(false); //this is for dont need to refresh the page after posting the tweet
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form action="" className="border-b2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          name=""
          id=""
          className="bg-slate-200 rounded-lg w-full p-2"
          type="text"
          placeholder="what going in world..."
          maxLength={280} //same number in the backend
        ></textarea>
        <button
            onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Post Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweetArea;
