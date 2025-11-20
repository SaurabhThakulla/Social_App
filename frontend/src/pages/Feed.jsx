import React from "react";
import Nav from "../components/Nav";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Ads from "../components/Profiles";

const Feed = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-between ">
        <Stories />
        <Posts />
        <Ads />
      </div>
    </div>
  );
};

export default Feed;
