import React from "react";
import Bg from "../assets/bhs.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative h-screen w-screen">
      <img src={Bg} alt="" className="h-full w-full object-cover" />

      <div
        className="flex w-[40%] h-[90%] bg-white/70 backdrop-blur-md absolute 
        top-1/2 right-20 -translate-y-1/2 
        justify-center flex-col gap-8 p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <form className="flex flex-col gap-5">
          <input
            className="border p-3 rounded"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="border p-3 rounded"
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit" className="bg-blue-500 text-white py-3 rounded">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
