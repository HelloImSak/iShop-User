import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/auth/authSlice";
import { cartApi } from "./features/cart/cartSlice";
import { imageApi } from "./features/images/imgSlice";
import { productApi } from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]:productApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [imageApi.reducerPath]:imageApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware, cartApi.middleware, imageApi.middleware),
});
setupListeners(store.dispatch);
