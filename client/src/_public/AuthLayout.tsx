import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import sideImg from "/assets/images/side-img.svg";

const AuthLayout = () => {
  const isauthenic = false;
  return (
    <div className="flex w-full">
      {isauthenic ? (
        <Navigate to="/" />
      ) : (
        <>
          <img
            src={sideImg}
            alt="logo"
            className="hidden md:block h-screen w-1/2 object-cover bg-no-repeat"
          />
          <section className="flex flex-1 justify-center items-center py-10">
            <Outlet />
          </section>
        </>
      )}
    </div>
  );
};

export default AuthLayout;
