import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authDataInfo } from "../";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
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
              loggedOutMessage: false,
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
                  userEmail: null,
                  showError: true,
                  errorMessage,
                  showWelcomeMessage: false,
                  showProfile: false,
                  loggedOutMessage: false,
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
                  userEmail: null,
                  showError: false,
                  errorMessage: null,
                  emailConfirm: true,
                  showWelcomeMessage: false,
                  showProfile: false,
                  loggedOutMessage: false,
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
              if (result.user.uid) {
                dispatch(
                  authDataInfo({
                    signedIn: true,
                    authUserId: result.user.uid,
                    userEmail: result.user.email,
                    showError: false,
                    errorMessage: null,
                    showWelcomeMessage: true,
                    loggedOutMessage: false,
                  })
                );
                localStorage.setItem(
                  "gardenofeden",
                  JSON.stringify({
                    authUserId: result.user.uid,
                    userEmail: result.user.email,
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
                  userEmail: null,
                  showError: true,
                  errorMessage,
                  showWelcomeMessage: false,
                  showProfile: false,
                  loggedOutMessage: false,
                })
              );
            });
          return {};
        },
      }),
      logOut: builder.mutation({
        queryFn: async ({ uid }, { dispatch }) => {
          signOut(auth)
            .then((response) => {
              window.localStorage.removeItem("gardenofeden");
              dispatch(
                authDataInfo({
                  signedIn: false,
                  authUserId: null,
                  userEmail: null,
                  showError: false,
                  errorMessage: null,
                  showWelcomeMessage: false,
                  showProfile: false,
                  loggedOutMessage: false,
                  showLogoutConfirm: false,
                })
              );
            })
            .catch((error) => {
              console.log("signout error");
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
  useLogOutMutation,
} = authApi;
export { authApi };
