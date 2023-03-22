import React from "react";
import "./TreeUpload.css";
import { Card } from "@material-tailwind/react";

const TreeUpload = () => {
  const imageList = [];
  return (
    <div className="static">
      <div className="relative">
        <button
          className="bg-stone-300 text-black font-bold rounded-2xl p-1 w-fit h-24 p-2 max-[640px]:h-fit"
          onClick={() => {}}
        >
          Click or Drop the images in this box, of the trees you planted and
          click save button besides the image
        </button>
        &nbsp;
      </div>
      {imageList.map((image, index) => (
        <div key={index} className="image-item">
          <Card className="border-2 border-white">
            <img src={image.data_url} alt="" className="tree-image" />
          </Card>

          <div className="image-item__btn-wrapper">
            <button className="bg-lime-900 m-1 text-xs w-14" onClick={() => {}}>
              Update
            </button>
            <button
              className="bg-sky-600 font-bold m-1 text-xs w-14"
              onClick={() => console.log("save")}
            >
              Save
            </button>
            <button
              className="bg-yellow-900 m-1 text-xs w-14"
              onClick={() => {}}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TreeUpload;
