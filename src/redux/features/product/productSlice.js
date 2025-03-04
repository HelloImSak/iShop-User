import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: "/api/v1/products",
        method: "GET",
      }),
    }),
    getByUuid: builder.query({
      query: (uuid) => ({
        url: `/api/v1/products/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllQuery, useGetByUuidQuery } = productApi;
