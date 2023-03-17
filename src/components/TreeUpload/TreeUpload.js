import React from "react";
import ImageUploading from "react-images-uploading";
import "./TreeUpload.css";
import { Card } from "@material-tailwind/react";

const TreeUpload = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 50;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
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
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
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
          <div className="fixed">
            <button
              className="bg-lime-900 p-1 rounded"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button
              className="bg-yellow-900 p-1 max-[640px]:mt-2 rounded"
              onClick={onImageRemoveAll}
            >
              Remove all images
            </button>
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

export default TreeUpload;
