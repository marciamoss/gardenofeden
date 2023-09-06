import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authDataInfo,
  userDataInfo,
  useSaveUserTreesMutation,
  useCheckAuthStatusMutation,
  useCreateImageUrlMutation,
} from "../store";
import { useTreeLocate } from ".";

const useUpdateTree = () => {
  const dispatch = useDispatch();
  const [createImageUrl, createImageUrlResult] = useCreateImageUrlMutation();
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const [saveUserTrees, saveUserTreesResult] = useSaveUserTreesMutation();
  const [geocode, clear, latitude, longitude, approximateGeoAddress] =
    useTreeLocate();

  const { image, imageUrl } = useSelector((state) => state.userData);
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
  const [key, setKey] = useState("");
  const [save, setSave] = useState(false);

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
    if (
      image?.imageType &&
      ["trees", "update_Tree"].filter((i) => i === image.imageType).length > 0
    ) {
      createImageUrl({
        imageLink: treeImageLink,
        userDataInfo,
        authUserId,
        imageType: image.imageType,
      });
    } else {
      setSave(true);
    }
  }, [treeImageLink, createImageUrl, authUserId, image.imageType]);

  useEffect(() => {
    if (
      (imageUrl &&
        ["trees", "update_Tree"].filter((i) => i === image.imageType).length >
          0) ||
      save
    ) {
      saveUserTrees({
        edenUserTrees: {
          _id,
          userId,
          tree_image_link: imageUrl || treeImageLink,
          latitude: latitude,
          longitude: longitude,
          geoAddress: approximateGeoAddress,
          users_tree_name: usersTreeName,
          date_planted: datePlanted,
        },
      });
    }
  }, [
    imageUrl,
    image?.imageType,
    _id,
    approximateGeoAddress,
    datePlanted,
    treeImageLink,
    latitude,
    longitude,
    saveUserTrees,
    userId,
    usersTreeName,
    save,
  ]);

  useEffect(() => {
    if (createImageUrlResult.error) {
      dispatch(
        userDataInfo({
          showGeoLocate: false,
          image: "",
          imageType: "",
          imageUrl: "",
          tree: "",
          imageUploadError: true,
        })
      );
    }
  }, [createImageUrlResult, dispatch]);

  useEffect(() => {
    if (image && image.imageType === "update_Tree" && image?.image) {
      const fn = tree_image_link.split("/");
      setKey(fn[fn.length - 1]);
      setTreeImageLink(`data:image/png;base64, ${image.image}`);
    }
  }, [image, tree_image_link, userId]);

  useEffect(() => {
    if (saveUserTreesResult.isSuccess) {
      dispatch(
        userDataInfo({
          showGeoLocate: false,
          image: "",
          imageType: "",
          imageUrl: "",
          tree: "",
          savedTree: saveUserTreesResult.data,
          imageVersion: key,
        })
      );
      dispatch(
        authDataInfo({
          showProfile: false,
        })
      );
    }
    if (saveUserTreesResult.error) {
      dispatch(
        userDataInfo({
          showGeoLocate: false,
          image: "",
          imageType: "",
          imageUrl: "",
          tree: "",
          imageUploadError: true,
          imageVersion: imageUrl
            ? imageUrl.split("/")[imageUrl.split("/").length - 1]
            : "",
        })
      );
    }
  }, [saveUserTreesResult, dispatch, imageUrl, key]);

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
          dispatch(
            userDataInfo({ showImagePicker: true, imageType: "update_Tree" })
          );
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
