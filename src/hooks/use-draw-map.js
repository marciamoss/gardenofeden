import { useEffect, useRef, useCallback, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useSelector, useDispatch } from "react-redux";
import {
  userDataInfo,
  useFetchAllTreesQuery,
  useCheckAuthStatusMutation,
} from "../store";
const keys = require("../keys.js");
const editIcon = require(`../images/edit.png`);
const connectIcon = require(`../images/connect.png`);

const useDrawMap = () => {
  const { savedTree } = useSelector((state) => state.userData);
  const { authUserId } = useSelector((state) => state.authData);
  const { data } = useFetchAllTreesQuery({ authUserId });

  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const dispatch = useDispatch();
  const [treeClicked, setTreeClicked] = useState(null);
  const [allTrees, setAllTrees] = useState(null);
  const [infoActionType, setInfoActionType] = useState(null);
  let mapRef = useRef(null);
  let infowindowRef = useRef(null);
  let markerRef = useRef(null);
  let infoActionRef = useRef(null);
  const markers = useRef([]);

  const infoClear = useCallback(() => {
    if (infoActionRef.current) {
      infoActionRef.current.setMap(null);
    }
    setTreeClicked(null);
    setInfoActionType(null);
  }, []);

  const clearMarkers = useCallback(() => {
    if (markers.current.length > 0) {
      for (let i = 0; i < markers.current.length; i++) {
        markers.current[i].setMap(null);
        if (infoActionRef.current) {
          infoActionRef.current.setMap(null);
        }
      }
    }
    markers.current = [];
    if (mapRef.current) {
      mapRef.current.setZoom(2.5);
    }
  }, [markers]);

  const infoMarker = useCallback(
    ({ t, authUserId, marker }) => {
      if (authUserId) {
        const infoIconType = t.currentUserTree ? editIcon : connectIcon;
        const InfoIconActionType = t.currentUserTree
          ? "editMarker"
          : "connectMarker";
        infoActionRef.current = new window.google.maps.Marker({
          position: {
            lat: marker.position.lat(),
            lng: marker.position.lng(),
          },
          map: mapRef.current,
          icon: infoIconType,
        });
        infoActionRef.current.addListener("click", () => {
          setTreeClicked(t);
          setInfoActionType(`${InfoIconActionType}`);
          checkAuthStatus({ authUserId });
        });
      }
    },
    [checkAuthStatus]
  );

  const popUps = useCallback(
    ({ t, marker, authUserId }) => {
      let imageString = `<img src='${t.tree_image_link}' alt='' style="display:block;margin-left:auto;margin-right:auto;height:100px;">`;
      let contentString;
      contentString = `<div style="place-content: center;color: black;font-weight: bold;text-align: center">${
        t.users_tree_name
          ? `This tree is called ${t.users_tree_name} and `
          : "This tree"
      } was planted here ${t.name ? `by ${t.name}` : "by an anonymous patron"}`;

      if (t.date_planted) {
        contentString += ` on ${`
        ${t.date_planted.substring(5, 7)}/${t.date_planted.substring(
          8,
          10
        )}/${t.date_planted.substring(0, 4)}`}`;
      }

      contentString += `.<br><br>${imageString}</div>`;

      if (infowindowRef.current) {
        infowindowRef.current.close();
        infoClear();
      }

      infowindowRef.current = new window.google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
      });
      infowindowRef.current.addListener("closeclick", () => infoClear());
      infowindowRef.current.open(mapRef.current, marker);
      infoMarker({ t, authUserId, marker });

      infowindowRef.current.addListener("visible", () => {
        mapRef.current.setCenter({
          lat: t.latitude,
          lng: t.longitude,
        });
        if (mapRef.current.getZoom() < 10 && authUserId) {
          mapRef.current.setZoom(10);
        }
        if (infoActionRef.current) {
          marker.setZIndex(0);
          infoActionRef.current.setZIndex(30);
        }
      });
    },
    [infoClear, infoMarker]
  );

  useEffect(() => {
    let updatedTree;
    if (treeClicked && checkAuthStatusResult.isSuccess) {
      updatedTree = allTrees?.filter((t) => t._id === treeClicked?._id)[0];
      popUps({
        t: updatedTree,
        marker: markerRef.current,
        authUserId,
      });
      if (infoActionType === "editMarker" && authUserId) {
        dispatch(
          userDataInfo({
            tree: {
              ...updatedTree,
              date_planted: treeClicked.date_planted?.substring(0, 10),
              authUserId,
            },
            showGeoLocate: true,
          })
        );
      }
      if (infoActionType === "connectMarker" && authUserId) {
        dispatch(
          userDataInfo({
            showConnectForm: true,
          })
        );
      }
    }
  }, [
    authUserId,
    allTrees,
    treeClicked,
    popUps,
    infoActionType,
    dispatch,
    checkAuthStatusResult,
  ]);

  useEffect(() => {
    if (savedTree) {
      let newTree = allTrees?.filter((t) => t._id === savedTree?._id)[0];
      if (newTree) {
        if (mapRef.current) {
          mapRef.current.setCenter({
            lat: savedTree.latitude,
            lng: savedTree.longitude,
          });
        }
        popUps({
          t: newTree,
          marker: markerRef.current,
          authUserId,
        });
      }
    }
  }, [savedTree, allTrees, popUps, authUserId]);

  useEffect(() => {
    if (data?.length && mapRef.current) {
      clearMarkers();
      dispatch(
        userDataInfo({
          totalTrees: data.length,
        })
      );
      data.forEach((t) => {
        let pos = {
          lat: t.latitude,
          lng: t.longitude,
        };
        let marker = new window.google.maps.Marker({
          position: pos,
          map: mapRef.current,
          animation: window.google.maps.Animation.DROP,
          icon: t.currentUserTree
            ? require(`../images/xmas_tree.png`)
            : require(`../images/parks_small.png`),
        });

        marker.addListener("click", () => {
          markerRef.current = marker;
          setTreeClicked(t);
          checkAuthStatus({ authUserId });
        });
        if (t._id === savedTree?._id) {
          markerRef.current = marker;
        }
        markers.current = [...markers.current, marker];
      });
      setAllTrees(data);
    }
  }, [
    data,
    dispatch,
    clearMarkers,
    savedTree?._id,
    checkAuthStatus,
    authUserId,
  ]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: keys.maps.apiKey,
      version: "weekly",
    });
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 2.5,
    };

    loader
      .load()
      .then((google) => {
        mapRef.current = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              dispatch(
                userDataInfo({
                  userLocation: pos,
                })
              );
              mapRef.current.setCenter(pos);
              new google.maps.Marker({
                position: pos,
                map: mapRef.current,
              });
            },
            () => {
              mapRef.current.getCenter();
            }
          );
        } else {
          console.log("Browser doesn't support Geolocation");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [dispatch]);
};

export default useDrawMap;
