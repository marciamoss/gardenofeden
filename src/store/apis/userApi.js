import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const keys = require("../../keys.js");

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: keys.mongo.api,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      saveUserProfile: builder.mutation({
        invalidatesTags: (result, error, edenUser) => {
          return [{ type: "UsersProfile", id: edenUser.userId }];
        },
        query: ({ edenUser }) => {
          return {
            url: "/api/eden/userSave",
            method: "POST",
            body: {
              edenUser,
            },
          };
        },
      }),
      fetchUser: builder.query({
        providesTags: (result, error, user) => {
          let tags;
          if (result) {
            tags = result?.map((user) => {
              return { type: "profile", id: user.userId };
            });
            tags.push({ type: "UsersProfile", id: user });
          } else {
            tags = [];
          }
          return tags;
        },
        query: (authUserId) => {
          return {
            url: `/api/eden/${authUserId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchUserQuery, useSaveUserProfileMutation } = userApi;
export { userApi };
