import React from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import useDrawMap from "../../hooks/use-draw-map";
import Profile from "../Profile/Profile";

const Main = () => {
  useDrawMap();
  const { showProfile } = useSelector((state) => state.authData);

  return (
    <>
      {showProfile ? <Profile /> : ""}
      <div
        id="map"
        className={`${
          showProfile ? "hidden" : ""
        } w-screen h-screen mx-auto mt-7`}
      ></div>
    </>
  );
};

export default Main;
