import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const keys = require("../../keys.js");

const userTreesApi = createApi({
  reducerPath: "userTrees",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      saveUserTrees: builder.mutation({
        invalidatesTags: (result, error, edenUserTrees) => {
          return [{ type: "UsersTrees", id: edenUserTrees.userId }];
        },
        query: ({ edenUserTrees }) => {
          return {
            url: "/api/eden/userTreesSave",
            method: "POST",
            body: {
              edenUserTrees,
            },
          };
        },
      }),
      fetchUserTrees: builder.query({
        providesTags: (result, error, userTrees) => {
          let tags;
          if (result) {
            tags = result?.map((userTrees) => {
              return { type: "trees", id: userTrees.userId };
            });
            tags.push({ type: "UsersTrees", id: userTrees });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (authUserId) => {
          return {
            url: `/api/eden/userTreesSave/${authUserId}`,
            method: "GET",
          };
        },
      }),
      deleteUserTree: builder.mutation({
        invalidatesTags: (result, error, tree) => {
          return [{ type: "UsersTrees", id: tree.userId }];
        },
        query: ({ tree }) => {
          return {
            url: `/api/eden/userTreesSave/${tree._id}`,
            method: "DELETE",
          };
        },
      }),
      fetchAllTrees: builder.query({
        providesTags: (result, error, userTrees) => {
          let tags;
          if (result) {
            tags = result?.map((userTrees) => {
              return { type: "trees", id: userTrees.userId };
            });
            tags.push({ type: "UsersTrees", id: userTrees });
          } else {
            tags = [];
          }
          return tags;
        },
        query: ({ authUserId }) => {
          return {
            url: `/api/eden/userTreesSave/allEdenTrees:userId:${authUserId}`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          let duplicateMarkers = [];
          response.forEach((t) => {
            let dup = response.filter(
              (element) =>
                element.latitude === t.latitude &&
                element.longitude === t.longitude
            );
            if (dup.length > 1) {
              dup = [...dup].map((t, index) => ({
                ...t,
                latitude: t.latitude + 0.000005 * index,
              }));
              duplicateMarkers = [...duplicateMarkers, ...dup];
              response = response.filter(
                (t) =>
                  t.latitude !== dup[0].latitude &&
                  t.longitude !== dup[0].longitude
              );
            }
          });
          if (duplicateMarkers.length) {
            response = [...response, ...duplicateMarkers];
          }
          return response;
        },
      }),
    };
  },
});

export const {
  useFetchUserTreesQuery,
  useSaveUserTreesMutation,
  useDeleteUserTreeMutation,
  useFetchAllTreesQuery,
} = userTreesApi;
export { userTreesApi };
