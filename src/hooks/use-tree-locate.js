import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDataInfo } from "../store";

const useTreeLocate = () => {
  const dispatch = useDispatch();
  const { userLocation, tree } = useSelector((state) => state.userData);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pinPlace, setPinPlace] = useState(false);
  const [clearClicked, setClearClicked] = useState(false);
  let mapRef = useRef(null);
  let geocoderRef = useRef(null);
  let markerRef = useRef(null);

  const clear = useCallback(() => {
    if (markerRef.current) {
      setClearClicked(true);
      setPinPlace(false);
      setLatitude(null);
      setLongitude(null);
      markerRef.current.setMap(null);
      dispatch(userDataInfo({ showGeoLocateError: false }));
    }
  }, [dispatch]);

  const setMarker = () => {
    markerRef.current = new window.google.maps.Marker({
      map: mapRef.current,
      animation: window.google.maps.Animation.DROP,
      icon: require(`../images/parks_small.png`),
    });
  };

  const geocode = useCallback(
    (request) => {
      clear();
      geocoderRef.current = new window.google.maps.Geocoder();
      geocoderRef.current
        .geocode(request)
        .then((result) => {
          const { results } = result;
          setLatitude(results[0].geometry.location.lat());
          setLongitude(results[0].geometry.location.lng());
          setPinPlace(true);
        })
        .catch((e) => {
          dispatch(userDataInfo({ showGeoLocateError: true }));
        });
    },
    [dispatch, clear]
  );

  useEffect(() => {
    mapRef.current = new window.google.maps.Map(
      document.getElementById("tree"),
      {
        zoom: userLocation.lat === 0 ? 2 : 8,
        center: { lat: userLocation.lat, lng: userLocation.lng },
        mapTypeControl: false,
      }
    );
    mapRef.current.addListener("click", (e) => {
      geocode({ location: e.latLng });
    });
    setMarker();
  }, [userLocation, geocode]);

  useEffect(() => {
    if (pinPlace || (tree.latitude_exif && tree.longitude_exif)) {
      if (clearClicked) {
        setMarker();
        setClearClicked(false);
      }
      markerRef.current.setPosition({
        lat: latitude ? latitude : tree.latitude_exif ? tree.latitude_exif : "",
        lng: longitude
          ? longitude
          : tree.longitude_exif
          ? tree.longitude_exif
          : "",
      });

      mapRef.current.setCenter({
        lat: latitude ? latitude : tree.latitude_exif ? tree.latitude_exif : "",
        lng: longitude
          ? longitude
          : tree.longitude_exif
          ? tree.longitude_exif
          : "",
      });
    }
  }, [latitude, longitude, pinPlace, clearClicked, tree]);

  return [geocode, clear, latitude, longitude];
};

export default useTreeLocate;
