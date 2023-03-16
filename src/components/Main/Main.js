import React from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import useDrawMap from "../../hooks/use-draw-map";
import Profile from "../Profile/Profile";

const Main = () => {
  useDrawMap();
  const { showProfile } = useSelector((state) => {
    return {
      showProfile: state.authData.showProfile,
    };
  });

  return (
    <>
      {showProfile ? <Profile /> : ""}
      <div
        id="map"
        className={`${
          showProfile ? "hidden" : ""
        } w-screen h-screen mx-auto mt-2`}
      ></div>
    </>
  );
};

export default Main;
