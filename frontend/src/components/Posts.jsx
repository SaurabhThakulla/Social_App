import React from "react";
import Bg from "../assets/bhs.jpg";
import { RiImageAddFill } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";

const Posts = () => {
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" w-[60%] bg-blue-400 h-screen border-2 border-black max-md:w-full font-inter">
      {/* CREATE POSTS */}
      <div className="border-b-2 border-black mt-7">
        <form
          action="submit"
          className="flex flex-col items-center justify-center"
        >
          <div className="flex w-full items-center px-4">
            <img
              src={Bg}
              className="w-20 h-20 mr-2 object-cover rounded-full max-md:w-[77px] max-md:-h-16"
            />
            <input
              type="text"
              className="w-[80%] text-2xl h-[7rem] rounded-3xl border-b-2 border-black bg-transparent text-black placeholder-gray-500 outline-none flex-1 max-md:w-auto"
              placeholder="Whats on your Mind ?"
            />
          </div>
          <label className="flex w-full mt-2 mb-5 justify-around text-xl rounded-2xl items-center">
            <RiImageAddFill className="cursor-pointer" />
            <FaRegSmile className="cursor-pointer" />
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
