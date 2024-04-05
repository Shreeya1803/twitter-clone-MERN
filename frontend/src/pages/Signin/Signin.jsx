import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice.js";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
//signin below
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { username, password });
      dispatch(loginSuccess(res.data));
      navigate("/"); //after login is successful return to home page
    } catch (err) {
      dispatch(loginFailed());
    }
  };
//signup below
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/"); //navigate to home page after signup 
    } catch (err) {
      dispatch(loginFailed());
    }
  };
  return (
    <form
      action=""
      className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 "
    >
      <h2 className="text-3xl font-bold text-center">Sign-In</h2>

      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter your username"
        className="text-xl py-2 rounded-full px-4"
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="text-xl py-2 rounded-full px-4"
        required
      />
      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        onClick={handleLogin}
      >
        Sign-In
      </button>
      <p className="text-center text-xl">Don't have an Account?</p>

      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter your username"
        className="text-xl py-2 rounded-full px-4"
        required
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email address"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter your password"
        className="text-xl py-2 rounded-full px-4"
        required
      />
      <button
        onClick={handleSignup}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit"
      >
        Sign-Up
      </button>
    </form>
  );
};

export default Signin;
