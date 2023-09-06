import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDataInfo, useFetchUserQuery } from "../store";

const useGetProfile = ({ authUserId }) => {
  const dispatch = useDispatch();
  const { data } = useFetchUserQuery(authUserId);
  useEffect(() => {
    if (data) {
      const { name, location, bio, profile_image_link } = data[0];

      dispatch(
        userDataInfo({
          user: { name, location, bio, profile_image_link },
        })
      );
    }
  }, [data, dispatch]);
};

export default useGetProfile;
