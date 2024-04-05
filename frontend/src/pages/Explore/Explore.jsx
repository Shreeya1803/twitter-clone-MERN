import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSidebar from "../../components/RightSideBar/RightSidebar";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";

import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : ( // showing only if the user is login 
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSideBar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <ExploreTweets />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
