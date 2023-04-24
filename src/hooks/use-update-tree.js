import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authDataInfo,
  userDataInfo,
  useSaveUserTreesMutation,
  useCheckAuthStatusMutation,
} from "../store";
import { useTreeLocate, useImageUpload } from ".";

const useUpdateTree = () => {
  const dispatch = useDispatch();
  const [openImageUploader] = useImageUpload();
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const [saveUserTrees, saveUserTreeResult] = useSaveUserTreesMutation();
  const [geocode, clear, latitude, longitude, approximateGeoAddress] =
    useTreeLocate();

  const { image } = useSelector((state) => state.userData);
  const { authUserId } = useSelector((state) => state.authData);
  const {
    userId,
    tree_image_link,
    latitude_exif,
    longitude_exif,
    _id,
    date_planted,
    users_tree_name,
    geoAddress,
  } = useSelector((state) => state.userData.tree);

  const [location, setLocation] = useState(geoAddress || "");
  const [datePlanted, setDatePlanted] = useState(date_planted || "");
  const [usersTreeName, setUsersTreeName] = useState(users_tree_name || "");
  const [treeImageLink, setTreeImageLink] = useState(tree_image_link || "");
  const [actionType, setActionType] = useState("");
  const handleLocation = useCallback(() => {
    geocode({ address: location });
  }, [geocode, location]);
  const handleClear = useCallback(() => {
    setLocation("");
    setDatePlanted("");
    setUsersTreeName("");
    clear();
  }, [clear]);
  const savePin = useCallback(() => {
    saveUserTrees({
      edenUserTrees: {
        _id,
        userId,
        tree_image_link: treeImageLink,
        latitude: latitude,
        longitude: longitude,
        geoAddress: approximateGeoAddress,
        users_tree_name: usersTreeName,
        date_planted: datePlanted,
      },
    });
  }, [
    _id,
    approximateGeoAddress,
    datePlanted,
    latitude,
    longitude,
    saveUserTrees,
    treeImageLink,
    userId,
    usersTreeName,
  ]);

  useEffect(() => {
    if (image && image.imageType === "update_Tree" && image?.image?.url) {
      setTreeImageLink(image.image.url);
    }
  }, [image]);

  useEffect(() => {
    if (saveUserTreeResult.isSuccess) {
      dispatch(
        userDataInfo({
          showGeoLocate: false,
          image: "",
          imageType: "",
          tree: "",
          savedTree: saveUserTreeResult.data,
        })
      );
      dispatch(
        authDataInfo({
          showProfile: false,
        })
      );
    }
    if (saveUserTreeResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserTreeResult, dispatch]);

  useEffect(() => {
    if (approximateGeoAddress) {
      setLocation(approximateGeoAddress);
    }
  }, [approximateGeoAddress]);

  useEffect(() => {
    if (checkAuthStatusResult.isSuccess) {
      if (!authUserId) {
        dispatch(
          userDataInfo({
            showGeoLocate: false,
          })
        );
      } else {
        if (actionType === "save" && authUserId) {
          savePin();
        }
        if (actionType === "locate" && authUserId) {
          handleLocation();
        }
        if (actionType === "clear_fields" && authUserId) {
          handleClear();
        }
        if (actionType === "image_upload" && authUserId) {
          openImageUploader({
            authUserId,
            imageType: "update_Tree",
          });
        }
        setActionType("");
      }
    }
  }, [
    checkAuthStatusResult,
    authUserId,
    actionType,
    dispatch,
    handleClear,
    handleLocation,
    openImageUploader,
    savePin,
  ]);

  return [
    latitude_exif,
    longitude_exif,
    checkAuthStatus,
    location,
    setLocation,
    authUserId,
    setActionType,
    treeImageLink,
    usersTreeName,
    setUsersTreeName,
    datePlanted,
    setDatePlanted,
    latitude,
    longitude,
  ];
};

export default useUpdateTree;
