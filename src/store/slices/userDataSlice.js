import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  image: "",
  imageType: "",
  tree: "",
  showGeoLocate: false,
  showGeoLocateError: false,
  imageUploadError: false,
  imageUploadErrorMessage: "",
  profileUpdateError: "",
  profileUpdateErrorMessage: "",
  showProfileUpdateForm: false,
  showTreeDeleteConfirm: false,
  showPicDeleteConfirm: false,
  userLocation: { lat: 0, lng: 0 },
  totalTrees: 0,
  savedTree: null,
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userDataInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { userDataInfo } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
