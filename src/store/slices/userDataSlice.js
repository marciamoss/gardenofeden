import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: "",
  imageType: "",
  imageUrl: "",
  tree: "",
  showGeoLocate: false,
  showGeoLocateError: false,
  imageUploadError: false,
  imageUploadErrorMessage: "",
  imageLoading: false,
  profileUpdateError: "",
  profileUpdateErrorMessage: "",
  showProfileUpdateForm: false,
  showTreeDeleteConfirm: false,
  deletedTree: "",
  showPicDeleteConfirm: false,
  userLocation: { lat: 0, lng: 0 },
  totalTrees: 0,
  savedTree: null,
  imageVersion: "",
  userImageVersion: "",
  user: "",
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
