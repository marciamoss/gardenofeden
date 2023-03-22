import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDataInfo,
  useOpenImageUploaderMutation,
  useGetImageGeoLocationMutation,
  useSaveUserProfileMutation,
  useSaveUserTreesMutation,
} from "../store";

const useImageUpload = () => {
  const dispatch = useDispatch();
  const [getImageGeoLocation, geoLocationResult] =
    useGetImageGeoLocationMutation();
  const [saveUserProfile, saveUserImageResult] = useSaveUserProfileMutation();
  const [saveUserTrees, saveUserTreeResult] = useSaveUserTreesMutation();
  const [openImageUploader] = useOpenImageUploaderMutation();

  const { image } = useSelector((state) => {
    return {
      image: state.userData.image,
    };
  });
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
      if (geoLocationResult.data.latitude && geoLocationResult.data.longitude) {
        saveUserTrees({
          edenUserTrees: {
            userId: geoLocationResult.data.authUserId,
            tree_image_link: geoLocationResult.data.image_link,
            latitude: geoLocationResult.data.latitude,
            longitude: geoLocationResult.data.longitude,
          },
        });
      } else {
        dispatch(
          userDataInfo({
            noGeoData: true,
          })
        );
      }
    }
  }, [geoLocationResult, dispatch, saveUserProfile]);

  useEffect(() => {
    if (saveUserImageResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserImageResult, dispatch]);

  useEffect(() => {
    if (saveUserTreeResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserTreeResult, dispatch]);

  return [openImageUploader, saveUserImageResult, saveUserTreeResult];
};

export default useImageUpload;
