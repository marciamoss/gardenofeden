import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authDataInfo } from "../";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
const keys = require("../../keys.js");
const app = initializeApp(keys.firebaseConfig);
const auth = getAuth(app);

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      logIn: builder.mutation({
        queryFn: async ({ email }, { dispatch }) => {
          dispatch(
            authDataInfo({
              showError: false,
              errorMessage: null,
            })
          );
          const actionCodeSettings = {
            url: keys.homePage.url,
            handleCodeInApp: true,
          };
          sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then((response) => {
              window.localStorage.setItem("EdenEmailForSignIn", email);
              dispatch(
                authDataInfo({
                  emailSent: true,
                })
              );
            })
            .catch((error) => {
              window.localStorage.removeItem("gardenofeden");
              let errorMessage = "Login failed";
              if (error.code === "auth/invalid-email") {
                errorMessage = `${errorMessage}: The email provided is not a valid email address.`;
              }
              dispatch(
                authDataInfo({
                  signedIn: false,
                  authUserId: null,
                  showError: true,
                  errorMessage,
                  showWelcomeMessage: false,
                })
              );
            });
          return {};
        },
      }),
      emailLinkComplete: builder.query({
        queryFn: async ({ signedIn }, { dispatch }) => {
          if (!signedIn && isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem("EdenEmailForSignIn");
            if (!email) {
              dispatch(
                authDataInfo({
                  signedIn: false,
                  authUserId: null,
                  showError: false,
                  errorMessage: null,
                  emailConfirm: true,
                  showWelcomeMessage: false,
                })
              );
            } else {
              await dispatch(
                authApi.endpoints.signInComplete.initiate({ email })
              );
            }
          }
          return {};
        },
      }),
      signInComplete: builder.mutation({
        queryFn: async ({ email }, { dispatch }) => {
          signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
              if (result.user.email) {
                dispatch(
                  authDataInfo({
                    signedIn: true,
                    authUserId: result.user.email,
                    showError: false,
                    errorMessage: null,
                    showWelcomeMessage: true,
                  })
                );
                localStorage.setItem(
                  "gardenofeden",
                  JSON.stringify({
                    authUserId: result.user.email,
                  })
                );
              }
              window.localStorage.removeItem("EdenEmailForSignIn");
            })
            .catch((error) => {
              window.localStorage.removeItem("gardenofeden");

              let errorMessage = "LogIn Link is expired";
              if (error.code === "auth/invalid-email") {
                errorMessage = `The email provided does not match the sign-in email address.`;
              }
              dispatch(
                authDataInfo({
                  signedIn: false,
                  authUserId: null,
                  showError: true,
                  errorMessage,
                  showWelcomeMessage: false,
                })
              );
            });
          return {};
        },
      }),
    };
  },
});

export const {
  useLogInMutation,
  useEmailLinkCompleteQuery,
  useSignInCompleteMutation,
} = authApi;
export { authApi };