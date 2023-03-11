import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
const keys = require("../keys.js");

const useDrawMap = () => {
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
        let map = new google.maps.Map(
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

              infoWindow.setPosition(pos);
              infoWindow.setContent("You are here.");
              infoWindow.open(map);
              map.setCenter(pos);
              new google.maps.Marker({
                position: pos,
                map,
              });
            },
            () => {
              map.getCenter();
            }
          );
        } else {
          console.log("Browser doesn't support Geolocation");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
};

export default useDrawMap;
