import React from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import { useDeleteUserTreeMutation } from "../../store";
import { useFormatDate } from "../../hooks";

const TreeItem = ({ image }) => {
  const [deleteUserTree] = useDeleteUserTreeMutation();
  const [rDate] = useFormatDate(image.date_planted);

  return (
    <div className="mb-5">
      <div className="bg-purple-50 rounded-t-2xl border-2 max-[640px]:text-xs min-[1493px]:text-lg">
        <div className="break-words text-center text-black font-bold">
          {image.users_tree_name ? image.users_tree_name : "Name: N/A"}
        </div>
        <div className="mt-1 h-fit text-center text-black font-bold">
          {rDate ? rDate : "Date: N/A"}
        </div>
      </div>
      <Card className="border-2 border-white">
        <CardHeader className="h-fit w-full">
          <img
            src={image.tree_image_link}
            className="w-full h-full"
            alt="Tree"
          />
        </CardHeader>
      </Card>
      <div className="bg-purple-50 rounded-b-2xl border-2">
        <button
          className="bg-lime-900 m-1 text-xs text-white w-14 min-[1493px]:text-lg min-[1493px]:w-24"
          onClick={() => {}}
        >
          Update
        </button>
        <button
          className="bg-yellow-900 m-1 text-xs text-white w-14 min-[1493px]:text-lg min-[1493px]:w-24"
          onClick={() => {
            deleteUserTree({ tree: image });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default TreeItem;
