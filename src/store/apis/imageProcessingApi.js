import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as filestack from "filestack-js";
import { userDataInfo } from "../";
const keys = require("../../keys.js");
const client = filestack.init(keys.fileStack.apiKey, keys.clientOptions);

const imageProcessingApi = createApi({
  reducerPath: "imageProcessing",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      openImageUploader: builder.mutation({
        queryFn: async ({ authUserId }, { dispatch }) => {
          try {
            client
              .picker({
                accept: ["jpg", "png", "gif"],
                onUploadDone: (res) => {
                  dispatch(
                    userDataInfo({
                      image: { image: res.filesUploaded[0], authUserId },
                    })
                  );
                },
                onFileUploadFailed: (fail) => {
                  dispatch(
                    userDataInfo({
                      imageUploadError: true,
                      imageUploadErrorMessage: fail.message,
                    })
                  );
                },
              })
              .open();
          } catch (err) {
            dispatch(
              userDataInfo({
                imageUploadError: true,
                imageUploadErrorMessage: err.message,
              })
            );
          }
          return {};
        },
      }),
      getImageGeoLocation: builder.mutation({
        queryFn: async ({ authUserId, upload }, { dispatch }) => {
          let latitudeArray = [];
          let longitudeArray = [];
          let latitude = null;
          let longitude = null;
          let exifData = await client.metadata(
            upload.handle,
            { exif: true },
            keys.clientOptions
          );
          let latitudeRef = exifData.exif["GPS GPSLatitudeRef"];
          latitudeArray = exifData.exif["GPS GPSLatitude"]?.substring(1);
          if (latitudeArray && longitudeArray) {
            latitudeArray = latitudeArray.slice(0, -1).split(", ");
            let longitudeRef = exifData.exif["GPS GPSLongitudeRef"];
            longitudeArray = exifData.exif["GPS GPSLongitude"]?.substring(1);
            longitudeArray = longitudeArray.slice(0, -1).split(", ");
            latitude = await dispatch(
              imageProcessingApi.endpoints.gpsCoords.initiate({
                degrees: latitudeArray[0],
                minutes: latitudeArray[1],
                seconds:
                  latitudeArray[2].split("/")[0] /
                  latitudeArray[2].split("/")[1],
                direction: latitudeRef,
              })
            ).unwrap();
            longitude = await dispatch(
              imageProcessingApi.endpoints.gpsCoords.initiate({
                degrees: longitudeArray[0],
                minutes: longitudeArray[1],
                seconds:
                  longitudeArray[2].split("/")[0] /
                  longitudeArray[2].split("/")[1],
                direction: longitudeRef,
              })
            ).unwrap();
          }
          return {
            data: {
              profile_image_link: upload.url,
              latitude,
              longitude,
              authUserId,
            },
          };
        },
      }),
      gpsCoords: builder.mutation({
        queryFn: ({ degrees, minutes, seconds, direction }) => {
          var dd = parseInt(degrees) + minutes / 60 + seconds / 3600;
          if (direction === "S" || direction === "W") {
            dd = dd * -1;
          }
          return { data: dd };
        },
      }),
    };
  },
});
export const { useOpenImageUploaderMutation, useGetImageGeoLocationMutation } =
  imageProcessingApi;
export { imageProcessingApi };
