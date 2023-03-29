import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useDispatch } from "react-redux";
import { userDataInfo, useFetchAllTreesQuery } from "../store";
const keys = require("../keys.js");

const useDrawMap = () => {
  const { data } = useFetchAllTreesQuery();
  const dispatch = useDispatch();
  let mapRef = useRef(null);
  let infowindowRef = useRef(null);

  const popUps = (t, marker) => {
    let imageString = `<img src='${t.tree_image_link}' alt='' style="height:100px;">`;
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
    }

    infowindowRef.current = new window.google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
    });
    infowindowRef.current.open(mapRef.current, marker);
  };

  useEffect(() => {
    if (data?.length && mapRef.current) {
      data.forEach((t) => {
        let pos = {
          lat: t.latitude,
          lng: t.longitude,
        };
        let marker = new window.google.maps.Marker({
          position: pos,
          map: mapRef.current,
          animation: window.google.maps.Animation.DROP,
          icon: require(`../images/parks_small.png`),
        });
        marker.addListener("mouseover", () => popUps(t, marker));
      });
    }
  }, [data]);

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

        const infoWindow = new google.maps.InfoWindow();

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
              infoWindow.setPosition(pos);
              infoWindow.setContent("You are here.");
              infoWindow.open(mapRef.current);
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
