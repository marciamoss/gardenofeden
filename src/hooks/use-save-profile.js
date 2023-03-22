import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDataInfo, useSaveUserProfileMutation } from "../store";

const useSaveProfile = () => {
  const dispatch = useDispatch();
  const [saveUserProfile, saveUserResult] = useSaveUserProfileMutation();

  useEffect(() => {
    if (saveUserResult.error) {
      dispatch(
        userDataInfo({
          profileUpdateError: true,
          profileUpdateErrorMessage: saveUserResult.error.message,
        })
      );
    }
    if (saveUserResult.status === "fulfilled") {
      dispatch(
        userDataInfo({
          showProfileUpdateForm: false,
        })
      );
    }
  }, [saveUserResult, dispatch]);

  return [saveUserProfile, saveUserResult];
};

export default useSaveProfile;
