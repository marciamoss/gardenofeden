import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
const keys = require("../keys.js");
const trees = require("../mockTrees.json");

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
        if (trees.length) {
          trees.map((t) => {
            const pos = {
              lat: t.latitude,
              lng: t.longitude,
            };
            return new google.maps.Marker({
              position: pos,
              map,
              animation: google.maps.Animation.DROP,
              icon: require(`../images/parks_small.png`),
            });
          });
        }

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
