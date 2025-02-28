import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./service/productService";
import { authApi } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]:productApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware),
});
setupListeners(store.dispatch);
