import React from "react";
import Nav from "../components/Nav";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Profile from "../components/Profiles";

const Feed = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-between max-md:justify-center">
        <Stories />
        <Posts />
        <Profile />
      </div>
    </div>
  );
};

export default Feed;
