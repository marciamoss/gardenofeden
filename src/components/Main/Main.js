import React from "react";
import "./Main.css";
import useDrawMap from "../../hooks/use-draw-map";

const Main = () => {
  useDrawMap();

  return <div id="map" className="w-screen h-screen mx-auto"></div>;
};

export default Main;
