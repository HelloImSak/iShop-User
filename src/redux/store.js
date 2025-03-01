import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./service/productService";
import { authApi } from "./features/auth/authSlice";
import { cartApi } from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]:productApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware, cartApi.middleware),
});
setupListeners(store.dispatch);
