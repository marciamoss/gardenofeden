import React from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import { useDrawMap } from "../../hooks";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

const Main = () => {
  useDrawMap();
  const { showProfile } = useSelector((state) => state.authData);

  return (
    <>
      {showProfile ? <Profile /> : ""}
      <div id="map" className={`${showProfile ? "hidden" : ""} mx-auto`}></div>
      {!showProfile ? (
        <Footer className="h-5 bg-red-800 border-2 border-red" />
      ) : (
        ""
      )}
    </>
  );
};

export default Main;
