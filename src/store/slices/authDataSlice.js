import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: JSON.parse(localStorage.getItem("gardenofeden"))?.authUserId
    ? true
    : false,
  authUserId:
    JSON.parse(localStorage.getItem("gardenofeden"))?.authUserId || null,
  userEmail:
    JSON.parse(localStorage.getItem("gardenofeden"))?.userEmail || null,
  showWelcomeMessage: JSON.parse(localStorage.getItem("gardenofeden"))
    ?.authUserId
    ? true
    : false,
  showError: false,
  errorMessage: null,
  emailConfirm: false,
  validRoute: false,
  emailSent: false,
  showProfile: false,
  loggedOutMessage: false,
  showMenu: false,
  showSignin: false,
  showAbout: false,
  showWorks: false,
};
const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    authDataInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { authDataInfo } = authDataSlice.actions;
export const authDataReducer = authDataSlice.reducer;
