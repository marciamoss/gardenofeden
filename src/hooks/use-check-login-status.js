import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataInfo } from "../store";

const useCheckLoginStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(window.localStorage.getItem("gardenofeden"))?.authUserId) {
      dispatch(
        authDataInfo({
          showProfile: false,
          signedIn: false,
          authUserId: null,
          loggedOutMessage: true,
        })
      );

      navigate("");
    }
  });
};

export default useCheckLoginStatus;
