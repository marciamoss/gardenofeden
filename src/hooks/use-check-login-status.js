import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataInfo } from "../store";

const useCheckLoginStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUserId = localStorage.getItem("gardenofeden")
    ? JSON.parse(localStorage.getItem("gardenofeden")).authUserId
    : "";
  const userEmail = localStorage.getItem("gardenofeden")
    ? JSON.parse(localStorage.getItem("gardenofeden")).userEmail
    : "";

  useEffect(() => {
    if (!authUserId) {
      dispatch(
        authDataInfo({
          showProfile: false,
          signedIn: false,
          authUserId: null,
          loggedOutMessage: true,
        })
      );
      navigate("");
    } else {
      dispatch(
        authDataInfo({
          signedIn: true,
          authUserId,
          userEmail,
        })
      );
    }
  }, [authUserId, dispatch, navigate, userEmail]);
};

export default useCheckLoginStatus;
