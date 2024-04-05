import React from "react";

import Homeicon from "@mui/icons-material/Home";
import Tagicon from "@mui/icons-material/Tag";
import Personicon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
const LeftSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch(); //initialise the dispatch 
  const handleLogout = () => {
   dispatch(logout());
  };
  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Homeicon fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Tagicon fontSize="large" />
            <p>Explore</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Personicon fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{currentUser.username}</p>
          <p className="font-bold">@{currentUser.username}</p>
        </div>
        <div>
          <Link to="signin">
            <button
              className="bg-blue-500 px-4 py-3 text-white rounded-full"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
