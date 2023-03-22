import { useFetchUserQuery } from "../store";

const useGetProfile = ({ authUserId }) => {
  const { data, isFetching, isLoading } = useFetchUserQuery(authUserId);
  let name,
    location,
    bio,
    profile_image_link = null;
  if (data) {
    name = data[0]?.name;
    location = data[0]?.location;
    bio = data[0]?.bio;
    profile_image_link = data[0]?.profile_image_link;
  }
  return [name, location, bio, profile_image_link, isFetching, isLoading];
};

export default useGetProfile;
