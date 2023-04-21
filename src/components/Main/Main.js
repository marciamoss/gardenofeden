import React from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import { useDrawMap } from "../../hooks";
import Profile from "../Profile/Profile";

const Main = () => {
  useDrawMap();
  const { showProfile } = useSelector((state) => state.authData);

  return (
    <>
      {showProfile ? <Profile /> : ""}
      <div id="map" className={`${showProfile ? "hidden" : ""} mx-auto`}></div>
    </>
  );
};

export default Main;
