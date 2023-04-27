import React, { useEffect } from "react";
import { useCheckAuthStatusMutation } from "../../store";

const InfoWindow = ({ tree, setInfoClicked, authUserId }) => {
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  useEffect(() => {
    if (checkAuthStatusResult.isSuccess) {
      if (
        checkAuthStatusResult?.data?.authUserId &&
        authUserId === checkAuthStatusResult?.data?.authUserId
      ) {
        setInfoClicked(true);
      }
    }
  }, [checkAuthStatusResult, authUserId, setInfoClicked]);

  return (
    <div className="content p-2 border-2 border-green-900 bg-neutral-100">
      <div>
        <img
          src={tree.tree_image_link}
          alt=""
          className="block ml-auto mr-auto h-14 border-2 border-green-900 mb-1"
        ></img>
        {authUserId ? (
          <button
            className="block mb-1 ml-auto mr-auto bg-green-600 w-12 rounded-full font-semibold text-white hover:bg-green-900"
            onClick={() => checkAuthStatus({ authUserId })}
          >
            {tree.currentUserTree ? "Edit" : "Connect"}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="item-body ">
        <h4 className="text-black font-bold text-center">
          {tree.users_tree_name
            ? `This tree is called ${tree.users_tree_name} and `
            : "This tree"}{" "}
          was planted here
          {tree.name ? ` by ${tree.name}` : " by an anonymous patron"}
          {tree.date_planted
            ? ` on 
        ${tree.date_planted.substring(5, 7)}/${tree.date_planted.substring(
                8,
                10
              )}/${tree.date_planted.substring(0, 4)}`
            : ""}
        </h4>
      </div>
    </div>
  );
};

export default InfoWindow;
