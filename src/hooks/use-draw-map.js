import ReactDOM from "react-dom/client";
import { useEffect, useRef, useCallback, useState } from "react";
import { Provider } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
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

  const infoClear = useCallback(() => {
    setTreeClicked(null);
    setInfoClicked(false);
  }, []);

  const clearMarkers = useCallback(() => {
    if (markers.current.length > 0) {
      for (let i = 0; i < markers.current.length; i++) {
        markers.current[i].setMap(null);
      }
    }
    markers.current = [];
    if (mapRef.current) {
      mapRef.current.setZoom(2.5);
    }
  }, [markers]);

  const popUps = useCallback(
    ({ t, marker, authUserId }) => {
      if (infowindowRef.current) {
        infowindowRef.current.close();
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

      infowindowRef.current.addListener("visible", () => {
        mapRef.current.setCenter({
          lat: t.latitude,
          lng: t.longitude,
        });
        if (mapRef.current.getZoom() < 10 && authUserId) {
          mapRef.current.setZoom(10);
        }
      });
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
        let marker = new window.google.maps.Marker({
          position: pos,
          map: mapRef.current,
          animation: markerAnimation ? window.google.maps.Animation.DROP : "",
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
