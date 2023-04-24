import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardHeader } from "@material-tailwind/react";
import { userDataInfo } from "../../store";
import { useFormatDate } from "../../hooks";

const TreeItem = ({ image }) => {
  const dispatch = useDispatch();
  const [rDate] = useFormatDate(image.date_planted);
  return (
    <div className="mb-5">
      <div className="bg-green-100 rounded-t-2xl max-[640px]:text-xs min-[1493px]:text-lg">
        <div className="break-words text-center text-black font-bold">
          {image.users_tree_name ? image.users_tree_name : "Name: N/A"}
        </div>
        <div className="mt-1 h-fit text-center text-black font-bold">
          {rDate ? rDate : "Date: N/A"}
        </div>
      </div>
      <Card className="bg-green-100">
        <CardHeader className="h-fit w-full flex flex-row place-content-center bg-green-100">
          <img
            src={image.tree_image_link}
            className="self-center w-96 h-96"
            alt="Tree"
          />
        </CardHeader>
      </Card>
      <div className="bg-green-100 rounded-b-2xl ">
        <button
          className="bg-lime-900 m-1 text-xs text-white w-14 min-[1493px]:text-lg min-[1493px]:w-24"
          onClick={() => {
            dispatch(
              userDataInfo({
                tree: {
                  ...image,
                  date_planted: image.date_planted?.substring(0, 10),
                },
                showGeoLocate: true,
              })
            );
          }}
        >
          Update
        </button>
        <button
          className="bg-yellow-900 m-1 text-xs text-white w-14 min-[1493px]:text-lg min-[1493px]:w-24"
          onClick={() => {
            dispatch(
              userDataInfo({
                tree: image,
                showTreeDeleteConfirm: true,
              })
            );
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default TreeItem;
