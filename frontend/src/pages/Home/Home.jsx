import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSidebar from "../../components/RightSideBar/RightSidebar";
import MainTweetArea from "../../components/MainTweetArea/MainTweetArea";
import Signin from "../Signin/Signin";
//checking if user login if login then only showing the home page
import { useSelector } from "react-redux";


const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSideBar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainTweetArea />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
