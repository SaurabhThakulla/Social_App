import React from "react";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sigin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
