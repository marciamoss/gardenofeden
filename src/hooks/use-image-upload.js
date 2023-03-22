import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDataInfo,
  useOpenImageUploaderMutation,
  useGetImageGeoLocationMutation,
  useSaveUserProfileMutation,
} from "../store";

const useImageUpload = () => {
  const dispatch = useDispatch();
  const [getImageGeoLocation, geoLocationResult] =
    useGetImageGeoLocationMutation();
  const [saveUserProfile, saveUserImageResult] = useSaveUserProfileMutation();
  const [openImageUploader] = useOpenImageUploaderMutation({
    userDataInfo,
  });

  const { image } = useSelector((state) => {
    return {
      image: state.userData.image,
    };
  });
  useEffect(() => {
    if (image) {
      getImageGeoLocation({
        authUserId: image.authUserId,
        upload: image.image,
      });
    }
  }, [image, getImageGeoLocation]);

  useEffect(() => {
    if (geoLocationResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
          imageUploadErrorMessage: geoLocationResult.error.message,
        })
      );
    } else if (geoLocationResult.data) {
      saveUserProfile({
        edenUser: {
          userId: geoLocationResult.data.authUserId,
          profile_image_link: geoLocationResult.data.profile_image_link,
          latitude: geoLocationResult.data.latitude,
          longitude: geoLocationResult.data.longitude,
        },
      });
    }
  }, [geoLocationResult, dispatch, saveUserProfile]);

  useEffect(() => {
    if (saveUserImageResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
          imageUploadErrorMessage: saveUserImageResult.error.message,
        })
      );
    }
  }, [saveUserImageResult, dispatch]);

  return [openImageUploader, saveUserImageResult];
};

export default useImageUpload;
