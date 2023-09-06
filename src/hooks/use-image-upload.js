import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDataInfo,
  useSaveUserProfileMutation,
  useCreateImageUrlMutation,
  useDeletePreviousVersionMutation,
} from "../store";

const useImageUpload = () => {
  const dispatch = useDispatch();
  const [saveUserProfile, saveUserImageResult] = useSaveUserProfileMutation();
  const [createImageUrl, createImageUrlResult] = useCreateImageUrlMutation();
  const [deletePreviousVersion] = useDeletePreviousVersionMutation();
  const { image, imageUrl, userImageVersion } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    if (image && image.imageType === "trees") {
      dispatch(
        userDataInfo({
          showGeoLocate: true,
          tree: {
            userId: image.authUserId,
            tree_image_link: `data:image/png;base64, ${image.image}`,
            latitude_exif: image.latitude,
            longitude_exif: image.longitude,
          },
        })
      );
    } else if (image && image.imageType === "user") {
      createImageUrl({
        imageLink: `data:image/png;base64, ${image.image}`,
        userDataInfo,
        authUserId: image.authUserId,
        imageType: image.imageType,
      });
    }
  }, [image, saveUserProfile, dispatch, createImageUrl]);

  useEffect(() => {
    if (
      createImageUrlResult.isSuccess &&
      imageUrl &&
      image.imageType === "user"
    ) {
      saveUserProfile({
        edenUser: {
          userId: image.authUserId,
          profile_image_link: imageUrl,
        },
      });
    } else if (createImageUrlResult.error) {
      dispatch(
        userDataInfo({
          image: "",
          imageUrl: "",
          userImageVersion: "",
          imageUploadError: true,
        })
      );
    }
  }, [
    createImageUrlResult,
    dispatch,
    imageUrl,
    image.authUserId,
    image.imageType,
    saveUserProfile,
  ]);

  useEffect(() => {
    if (saveUserImageResult && imageUrl && image.imageType === "user") {
      const { isSuccess, error } = saveUserImageResult;
      if (isSuccess || error) {
        const deleteVersion = isSuccess ? userImageVersion : imageUrl;
        if (deleteVersion) {
          deletePreviousVersion({
            key: deleteVersion.split("/")[deleteVersion.split("/").length - 1],
          });
        }
        dispatch(
          userDataInfo({
            image: "",
            imageUrl: "",
            userImageVersion: "",
            imageUploadError: error ? true : false,
          })
        );

        setTimeout(() => {
          dispatch(
            userDataInfo({
              imageLoading: false,
            })
          );
        }, 5000);
      }
    }
  }, [
    saveUserImageResult,
    dispatch,
    imageUrl,
    image.imageType,
    userImageVersion,
    deletePreviousVersion,
  ]);
};

export default useImageUpload;
