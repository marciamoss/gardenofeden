import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authDataReducer, authDataInfo } from "./slices/authDataSlice";

import { authApi } from "./apis/authApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo };

export {
  useLogInMutation,
  useEmailLinkCompleteQuery,
  useSignInCompleteMutation,
} from "./apis/authApi";

export {} from "./apis/authApi";
