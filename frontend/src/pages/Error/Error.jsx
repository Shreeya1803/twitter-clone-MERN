import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center my-8 space-y-5">
      <h2 className="font-bold text-4xl">Error, 404 Not Found</h2>
      <p className="pb-2">
        LogIn OR Sign-In to Access <br />
      </p>
      <Link to='/signin' className="bg-red-500 py-1 px-3 rounded-full text-white">
        LogIn
      </Link>
    </div>
  );
};

export default Error;
