import React from "react";

const Nav = () => {
  return (
    <div className="flex justify-around font-inter text-white w-full h-[6rem] bg-black flex-row ">
      <div className="text-2xl p-8 items-center">Social_APP</div>
      <div className="flex w-1/2 flex-row justify-around items-center text-xl p-3 max-md:justify-end">
        <li className="list-none mr-[6rem] max-md:mr-0 max-md:hidden">Feed</li>
        <li className="list-none ml-[10rem] max-md:hidden">People</li>
        <button className="md:hidden w-10 h-7 bg-white"></button>
      </div>
    </div>
  );
};

export default Nav;
