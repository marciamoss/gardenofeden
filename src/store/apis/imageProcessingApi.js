import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as AWS from "aws-sdk";

const keys = require("../../keys.js");
const Buffer = require("buffer/").Buffer;
const s3 = new AWS.S3({
  accessKeyId: keys.aws.accessKeyId,
  secretAccessKey: keys.aws.secretAccessKey,
  region: keys.aws.region,
});

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
      createImageUrl: builder.mutation({
        queryFn: async (
          { imageLink, userDataInfo, authUserId, imageType },
          { dispatch }
        ) => {
          const buf = Buffer.from(imageLink.split(", ")[1], "base64");
          const fileName = `${authUserId}${Math.floor(
            Math.random() * 899999 + 100000
          )}${Date.now()}.jpeg`;
          const params = {
            Bucket: keys.aws.bucket,
            Key: fileName,
            ACL: "public-read",
            Body: buf,
            ContentType: "image/jpeg",
          };

          return s3.upload(params, {}, (error, { Location }) => {
            if (error) {
              dispatch(
                userDataInfo({
                  imageUploadError: true,
                })
              );
            }
            dispatch(
              userDataInfo({
                imageUrl: Location,
              })
            );
          });
        },
      }),
      deletePreviousVersion: builder.mutation({
        queryFn: async ({ key }, { dispatch }) => {
          return s3.listObjectVersions(
            { Bucket: keys.aws.bucket, Prefix: key },
            (error, { Versions }) => {
              let versions = [];
              Versions.forEach(async (v) => {
                versions = [...versions, { versionId: v.VersionId, key }];
              });
              dispatch(
                imageProcessingApi.endpoints.deleteImageUrl.initiate({
                  versions,
                  callback: () => {},
                })
              );
            }
          );
        },
      }),
      deleteImageUrl: builder.mutation({
        queryFn: async ({ versions, callback }) => {
          versions.forEach((v) => {
            s3.deleteObject(
              {
                Bucket: keys.aws.bucket,
                Key: v.key,
                VersionId: v.versionId,
              },
              callback
            );
          });
          return { data: null };
        },
      }),
    };
  },
});
export const { useCreateImageUrlMutation, useDeletePreviousVersionMutation } =
  imageProcessingApi;
export { imageProcessingApi };
