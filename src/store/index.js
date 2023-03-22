import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authDataReducer, authDataInfo } from "./slices/authDataSlice";
import { userDataReducer, userDataInfo } from "./slices/userDataSlice";
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import { imageProcessingApi } from "./apis/imageProcessingApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    userData: userDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [imageProcessingApi.reducerPath]: imageProcessingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(imageProcessingApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo, userDataInfo };

export {
  useLogInMutation,
  useEmailLinkCompleteQuery,
  useSignInCompleteMutation,
  useLogOutMutation,
} from "./apis/authApi";

export { useSaveUserProfileMutation, useFetchUserQuery } from "./apis/userApi";
export {
  useGetImageGeoLocationMutation,
  useOpenImageUploaderMutation,
} from "./apis/imageProcessingApi";
