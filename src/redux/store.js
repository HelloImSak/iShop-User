import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/auth/authSlice";
import { brandApi } from "./features/brand/brandSlice";
import { imageApi } from "./features/images/imgSlice";
import { cartApi } from "./service/cart/cartSlice";
import { productApi } from "./service/product/productSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      brandApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      imageApi.middleware
    ),
});
setupListeners(store.dispatch);
