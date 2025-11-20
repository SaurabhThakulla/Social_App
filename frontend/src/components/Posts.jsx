import React from "react";
import Bg from "../assets/bhs.jpg";
import { RiImageAddFill } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";

const Posts = () => {
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[60%] bg-blue-400 h-screen border-2 border-black">
      {/* CREATE POSTS */}
      <div className="border-b-2 border-black mt-7">
        <form
          action="submit"
          className="flex flex-col items-center justify-center"
        >
          <div className="flex w-full items-center flex-1 px-4">
            <img src={Bg} className="w-20 h-20 object-cover rounded-full" />
            <input
              type="text"
              className="w-full h-[7rem] rounded-3xl border-b-2 border-black bg-transparent text-black"
              placeholder="Whats on your Mind"
            />
          </div>
          <label className="flex w-full mt-2 mb-5 justify-around text-xl rounded-2xl items-center">
            <RiImageAddFill className="cursor-pointer" />
            <input type="file" hidden />
            <button
              onClick={submit}
              className="flex justify-center text-xl rounded-full items-center w-[5rem] h-[3rem] hover:bg-slate-500  bg-green-500"
            >
              Post
            </button>
          </label>
        </form>
      </div>

      {/* POSTS */}
      <div></div>
    </div>
  );
};

export default Posts;
