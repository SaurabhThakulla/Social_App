import React from "react";
import Nav from "../components/Nav";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Ads from "../components/Ads";

const Feed = () => {
  return (
    <div>
      <Nav />
      <Stories />
      <Posts />
      <Ads />
    </div>
  );
};

export default Feed;
