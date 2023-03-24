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
  const [openImageUploader] = useOpenImageUploaderMutation();
  const { image } = useSelector((state) => state.userData);

  useEffect(() => {
    if (image && image.imageType === "trees") {
      getImageGeoLocation({
        authUserId: image.authUserId,
        upload: image.image,
        imageType: image.imageType,
      });
    } else if (image && image.imageType === "user") {
      saveUserProfile({
        edenUser: {
          userId: image.authUserId,
          profile_image_link: image.image.url,
        },
      });
    }
  }, [image, getImageGeoLocation, saveUserProfile]);

  useEffect(() => {
    if (geoLocationResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
          imageUploadErrorMessage: geoLocationResult.error.message,
        })
      );
    } else if (geoLocationResult.data) {
      dispatch(
        userDataInfo({
          showGeoLocate: true,
          tree: {
            userId: geoLocationResult.data.authUserId,
            tree_image_link: geoLocationResult.data.image_link,
            latitude_exif: geoLocationResult.data.latitude
              ? geoLocationResult.data.latitude
              : null,
            longitude_exif: geoLocationResult.data.longitude
              ? geoLocationResult.data.longitude
              : null,
          },
        })
      );
    }
  }, [geoLocationResult, dispatch]);

  useEffect(() => {
    if (saveUserImageResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserImageResult, dispatch]);

  return [openImageUploader, saveUserImageResult];
};

export default useImageUpload;
