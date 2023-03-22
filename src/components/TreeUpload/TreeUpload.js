import React from "react";
import "./TreeUpload.css";
import { Card } from "@material-tailwind/react";
import { useFetchUserTreesQuery, useDeleteUserTreeMutation } from "../../store";

const TreeUpload = ({ authUserId, openImageUploader }) => {
  const { data, isFetching, isLoading } = useFetchUserTreesQuery(authUserId);
  const [deleteUserTree] = useDeleteUserTreeMutation();
  return (
    <div className="static">
      <div className="relative">
        <button
          className="bg-stone-300 text-black font-bold rounded-2xl p-1 w-fit h-24 p-2 max-[640px]:h-fit"
          onClick={() => openImageUploader({ authUserId, imageType: "trees" })}
        >
          Click to upload the images in this box, of the trees you planted and
          click save button besides the image
        </button>
        &nbsp;
      </div>
      {data && data.length > 0
        ? data.map((image, index) => (
            <div key={index} className="image-item">
              <Card className="border-2 border-white">
                <img
                  src={image.tree_image_link}
                  alt=""
                  className="tree-image"
                />
              </Card>

              <div className="image-item__btn-wrapper">
                <button
                  className="bg-lime-900 m-1 text-xs w-14"
                  onClick={() => {}}
                >
                  Update
                </button>
                <button
                  className="bg-yellow-900 m-1 text-xs w-14"
                  onClick={() => {
                    deleteUserTree({ tree: image });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default TreeUpload;
