import ReactDOM from "react-dom/client";
import { useEffect, useRef, useCallback, useState } from "react";
import { Provider } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useSelector, useDispatch } from "react-redux";
import {
  userDataInfo,
  useFetchAllTreesQuery,
  useCheckAuthStatusMutation,
  store,
} from "../store";
import InfoWindow from "../components/Main/InfoWindow";
const keys = require("../keys.js");

const useDrawMap = () => {
  const { savedTree } = useSelector((state) => state.userData);
  const { authUserId } = useSelector((state) => state.authData);
  const { data } = useFetchAllTreesQuery({ authUserId });
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const dispatch = useDispatch();
  const [treeClicked, setTreeClicked] = useState(null);
  const [allTrees, setAllTrees] = useState(null);
  const [infoClicked, setInfoClicked] = useState(false);
  let mapRef = useRef(null);
  let infowindowRef = useRef(null);
  let markerRef = useRef(null);
  const markers = useRef([]);
  let maxZoomService = useRef(null);
  let markerClusterRef = useRef(null);
  const [redrawMarker, setRedrawMarker] = useState(false);

  const infoClear = useCallback(() => {
    setTreeClicked(null);
    setInfoClicked(false);
  }, []);

  const clearMarkers = useCallback(() => {
    if (markerClusterRef.current) {
      markerClusterRef.current.removeMarkers(markers.current);
      markerClusterRef.current.clearMarkers();
    }
    if (markers.current.length > 0) {
      for (let i = 0; i < markers.current.length; i++) {
        markers.current[i].setMap(null);
      }
    }

    markers.current = [];
  }, [markers]);

  const createMarker = useCallback(
    ({
      position,
      icon,
      animation = "",
      title,
      markerTree,
      authUserId,
      map,
      label,
      zIndex,
    }) => {
      let marker = new window.google.maps.Marker({
        position,
        map,
        icon,
        animation,
        title,
        label,
        zIndex,
      });
      if (markerTree) {
        marker.addListener("click", () => {
          markerRef.current = marker;
          setTreeClicked(markerTree);
          checkAuthStatus({ authUserId });
        });
      }
      return marker;
    },
    [checkAuthStatus]
  );

  const popUps = useCallback(
    ({ t, marker, authUserId }) => {
      if (infowindowRef.current) {
        infowindowRef.current.close();
      }
      mapRef.current.setCenter({
        lat: t.latitude,
        lng: t.longitude,
      });
      if (maxZoomService.current) {
        maxZoomService.current.getMaxZoomAtLatLng(
          {
            lat: t.latitude,
            lng: t.longitude,
          },
          (result) => {
            if (result.status !== "OK") {
              mapRef.current.setZoom(20);
            } else {
              mapRef.current.setZoom(result.zoom * 2);
            }
          }
        );
      }
      let div = document.createElement("div");
      const root = ReactDOM.createRoot(div);
      infowindowRef.current = new window.google.maps.InfoWindow({
        content: root.render(
          <Provider store={store}>
            <InfoWindow
              tree={t}
              setInfoClicked={setInfoClicked}
              authUserId={authUserId}
            />
          </Provider>
        ),
        maxWidth: 200,
      });
      infowindowRef.current.setContent(div);
      infowindowRef.current.addListener("closeclick", () => infoClear());
      infowindowRef.current.open(mapRef.current, marker);
    },
    [infoClear]
  );

  useEffect(() => {
    let updatedTree;
    if (treeClicked) {
      updatedTree = allTrees?.filter((t) => t._id === treeClicked?._id)[0];
      setTreeClicked(updatedTree);
      popUps({
        t: updatedTree,
        marker: markerRef.current,
        authUserId,
      });
    }
  }, [allTrees, authUserId, popUps, treeClicked]);

  useEffect(() => {
    if (infoClicked) {
      if (treeClicked?.currentUserTree) {
        dispatch(
          userDataInfo({
            tree: {
              ...treeClicked,
              date_planted: treeClicked.date_planted?.substring(0, 10),
              authUserId,
            },
            showGeoLocate: true,
          })
        );
      } else {
        dispatch(
          userDataInfo({
            showConnectForm: true,
          })
        );
      }
      setInfoClicked(false);
    }
  }, [infoClicked, treeClicked, authUserId, dispatch, checkAuthStatusResult]);

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
      let markerAnimation = false;
      if (markers.current.length === 0) {
        markerAnimation = true;
      }
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
        let marker = createMarker({
          position: pos,
          icon: t.currentUserTree
            ? require(`../images/xmas_tree.png`)
            : require(`../images/parks_small.png`),
          animation: markerAnimation ? window.google.maps.Animation.DROP : "",
          title: t._id,
          markerTree: t,
          authUserId,
          map: mapRef.current,
        });
        if (t._id === savedTree?._id) {
          markerRef.current = marker;
        }
        markers.current = [...markers.current, marker];
      });
      setAllTrees(data);
      if (markerClusterRef.current) {
        markerClusterRef.current.addMarkers(markers.current);
        if (infowindowRef.current && markerRef.current) {
          markerRef.current =
            markers.current[
              data.findIndex((t) => t._id === markerRef.current.getTitle())
            ];
        }
      }
    }
  }, [
    data,
    dispatch,
    clearMarkers,
    savedTree?._id,
    checkAuthStatus,
    authUserId,
    createMarker,
  ]);

  useEffect(() => {
    if (redrawMarker) {
      markerClusterRef.current.removeMarker(markerRef.current, true);
      let marker = createMarker({
        position: markerRef.current.getPosition(),
        icon: markerRef.current.getIcon(),
        title: markerRef.current.getTitle(),
        markerTree: treeClicked,
        authUserId,
        map: mapRef.current,
      });
      markers.current[markers.current.indexOf(markerRef.current)] = marker;
      markerClusterRef.current.addMarker(marker);
      setRedrawMarker(false);
      infoClear();
      infowindowRef.current = null;
      markerRef.current = null;
    }
  }, [
    redrawMarker,
    authUserId,
    checkAuthStatus,
    infoClear,
    treeClicked,
    createMarker,
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
          navigator.geolocation.getCurrentPosition((position) => {
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
          });
        } else {
          console.log("Browser doesn't support Geolocation");
        }
        maxZoomService.current = new window.google.maps.MaxZoomService();
        markerClusterRef.current = new MarkerClusterer({
          map: mapRef.current,
          renderer: {
            render: ({ count, position }) => {
              if (infowindowRef.current && !markerRef.current.getMap()) {
                setRedrawMarker(true);
              }
              return createMarker({
                icon: {
                  url: require(`../images/parks_big.png`),
                },
                label: {
                  text: String(count),
                  color: "black",
                  fontSize: "12px",
                  fontWeight: "bolder",
                },
                position,
                zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
              });
            },
          },
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [dispatch, createMarker]);
};

export default useDrawMap;
