import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDataInfo, useCheckAuthStatusMutation } from "../store";

const useTreeLocate = () => {
  const dispatch = useDispatch();
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const { userLocation, tree } = useSelector((state) => state.userData);
  const { authUserId } = useSelector((state) => state.authData);
  const [approximateGeoAddress, setApproximateGeoAddress] = useState(
    tree.geoAddress || ""
  );
  const [geocodeLatLng, setGeocodeLatLng] = useState(null);
  const [latitude, setLatitude] = useState(
    tree?.latitude || tree?.latitude_exif || null
  );
  const [longitude, setLongitude] = useState(
    tree?.longitude || tree.longitude_exif || null
  );
  const [clearClicked, setClearClicked] = useState(false);
  let mapRef = useRef(null);
  let geocoderRef = useRef(null);
  let markerRef = useRef(null);

  const clear = useCallback(() => {
    if (markerRef.current) {
      setClearClicked(true);
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
          setApproximateGeoAddress(results[0].formatted_address);
          setLatitude(results[0].geometry.location.lat());
          setLongitude(results[0].geometry.location.lng());
        })
        .catch((e) => {
          dispatch(userDataInfo({ showGeoLocateError: true }));
        });
    },
    [dispatch, clear]
  );

  const reverseGeocode = useCallback(
    (latlng) => {
      new window.google.maps.Geocoder()
        .geocode({ location: latlng })
        .then((result) => {
          const { results } = result;
          setApproximateGeoAddress(results[0].formatted_address);
        })
        .catch((e) => {
          setApproximateGeoAddress(`${latitude}, ${longitude}`);
        });
    },
    [latitude, longitude]
  );
  useEffect(() => {
    if (checkAuthStatusResult.isSuccess) {
      if (!authUserId) {
        dispatch(
          userDataInfo({
            showGeoLocate: false,
          })
        );
      } else {
        geocode({ location: geocodeLatLng });
      }
    }
  }, [checkAuthStatusResult, authUserId, geocodeLatLng]);
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
      checkAuthStatus({ authUserId });
      setGeocodeLatLng(e.latLng);
    });
    setMarker();
  }, [userLocation, geocode]);

  useEffect(() => {
    if (latitude && longitude) {
      if (clearClicked) {
        setMarker();
        setClearClicked(false);
      }
      markerRef.current.setPosition({ lat: latitude, lng: longitude });
      mapRef.current.setCenter({ lat: latitude, lng: longitude });

      if (latitude && longitude && !approximateGeoAddress) {
        reverseGeocode({
          lat: latitude,
          lng: longitude,
        });
      }
    }
  }, [
    latitude,
    longitude,
    clearClicked,
    approximateGeoAddress,
    reverseGeocode,
  ]);

  return [geocode, clear, latitude, longitude, approximateGeoAddress];
};

export default useTreeLocate;
