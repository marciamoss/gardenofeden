import React from "react";
import ImageUploading from "react-images-uploading";
import "./TreeUpload.css";
import { Card } from "@material-tailwind/react";

const TreeUpload = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 50;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="static">
          <div className="relative">
            <button
              className="bg-gray-200 text-black font-bold rounded-2xl p-1 w-fit h-24 p-2 max-[640px]:h-fit"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
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
                <button
                  className="bg-lime-900 m-1 text-xs w-14"
                  onClick={() => onImageUpdate(index)}
                >
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
                  onClick={() => onImageRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default TreeUpload;
