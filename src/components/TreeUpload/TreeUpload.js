import React from "react";
import { useDispatch } from "react-redux";
import TreeItem from "./TreeItem";
import { useFetchUserTreesQuery, userDataInfo } from "../../store";
import Skeleton from "../Skeleton";

const TreeUpload = ({ authUserId }) => {
  const dispatch = useDispatch();
  const { data, isFetching, isLoading } = useFetchUserTreesQuery(authUserId);
  return (
    <div className="static p-5">
      <div className="relative">
        <button
          className="bg-purple-50 text-black font-bold rounded-2xl w-fit h-24 p-2 max-[640px]:text-sm max-[640px]:h-fit min-[608px]:mb-5"
          onClick={() =>
            dispatch(
              userDataInfo({ showImagePicker: true, imageType: "trees" })
            )
          }
        >
          Click in this box to upload the images of your trees
          <p className="text-sm text-green-700 font-bold">
            {data && data?.length > 0
              ? `Your Number of trees ${data.length}`
              : ""}
          </p>
        </button>
        &nbsp;
      </div>
      <div className="pl-5 pr-5 mb-5 max-[653px]:mb-10">
        <>
          {isFetching || isLoading ? (
            <Skeleton times={10} className="h-10 w-full" />
          ) : (
            ""
          )}

          {!isFetching && !isLoading && data && data.length > 0
            ? data
                .map((image, index) => (
                  <TreeItem key={image._id} image={image} />
                ))
                .reverse()
            : ""}
        </>
      </div>
    </div>
  );
};

export default TreeUpload;
