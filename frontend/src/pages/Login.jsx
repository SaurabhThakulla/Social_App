import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Bg from "../assets/bhs.jpg";

const Sigin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    console.log("Submit clicked 1 ");

    e.preventDefault();
    const data = { email, password };
    let res = await fetch("http://10.71.85.100:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      navigate("/feed");
    } else {
      res.send("Password wrong");
    }
    console.log("Submit clicked 2");
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <img src={Bg} alt="" className="h-full w-full object-cover" />

      {/* Form Box */}
      <div
        className="flex w-[40%] h-[90%] bg-white/70 backdrop-blur-md absolute 
        top-1/2 right-20 -translate-y-1/2 
        justify-center flex-col gap-8 p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center">Signup</h2>

        <form onSubmit={submit} className="flex flex-col gap-5">
          <input
            className="border p-3 rounded"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <input
            className="border p-3 rounded"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-3 rounded">
            Submit
          </button>
          <p>
            Dont have an account{" "}
            <Link to="/" className="text-blue-700">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sigin;
