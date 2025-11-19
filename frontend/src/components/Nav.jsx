import React from "react";

const Nav = () => {
  return (
    <div className="flex justify-between  w-full h-[3rem] bg-blue-400 flex-row">
      <div>Social_APP</div>
      <div className="flex w-1/3 flex-row justify-around items-center text-xl p-3">
        <li className="list-none">Feed</li>
        <li className="list-none">Profile</li>
      </div>
    </div>
  );
};

export default Nav;
