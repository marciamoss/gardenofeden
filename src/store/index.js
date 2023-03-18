import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authDataReducer, authDataInfo } from "./slices/authDataSlice";
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo };

export {
  useLogInMutation,
  useEmailLinkCompleteQuery,
  useSignInCompleteMutation,
  useLogOutMutation,
} from "./apis/authApi";

export { useSaveUserProfileMutation, useFetchUserQuery } from "./apis/userApi";
