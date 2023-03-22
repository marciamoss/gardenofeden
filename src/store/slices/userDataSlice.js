import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  image: "",
  imageUploadError: false,
  imageUploadErrorMessage: "",
  profileUpdateError: "",
  profileUpdateErrorMessage: "",
  showProfileUpdateForm: false,
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
