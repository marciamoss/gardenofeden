import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDataInfo, useDeleteUserTreeMutation } from "../store";
const useImageDelete = () => {
  const dispatch = useDispatch();
  const [deleteUserTree, deleteUserTreeResult] = useDeleteUserTreeMutation();
  useEffect(() => {
    if (deleteUserTreeResult.isSuccess) {
      dispatch(
        userDataInfo({
          showTreeDeleteConfirm: false,
          image: "",
          imageType: "",
        })
      );
    }
    if (deleteUserTreeResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
          showTreeDeleteConfirm: false,
          image: "",
          imageType: "",
        })
      );
    }
  }, [deleteUserTreeResult, dispatch]);
  return [deleteUserTree];
};
export default useImageDelete;
