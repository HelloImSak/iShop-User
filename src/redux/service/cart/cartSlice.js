import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ userUuid, productUuid, quantity }) => ({
        url: "/api/v1/carts/add-to-cart",
        method: "POST",
        body: { userUuid, productUuid, quantity },
      }),
    }),

    getUserCart: builder.query({
      query: (userId) => `/api/v1/carts/get-by-user/${userId}`,
    }),

    removeQtyByOne: builder.mutation({
      query: (uuid) => ({
        url: `/api/v1/carts/remove-quantity/${uuid}`,
        method: "PUT",
      }),
    }),

    addQtyByOne: builder.mutation({
      query: (uuid) => ({
        url: `/api/v1/carts/add-quantity/${uuid}`,
        method: "PUT",
      }),
    }),

    removeAllItems: builder.mutation({
      query: (cartUuid) => ({
        url: `/api/v1/carts/${cartUuid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUserCartQuery, useAddToCartMutation, useRemoveQtyByOneMutation, useAddQtyByOneMutation, useRemoveAllItemsMutation } = cartApi;
