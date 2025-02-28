import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ENDPOINT }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: "/api/v1/products",
      }),
    }),
    getByUuid: builder.query({
      query: (Uuid) => ({
        url: `/api/v1/products/${Uuid}`,
      }),
    }),
  }),
});

export const { useGetAllQuery, useGetByUuidQuery } = productApi;
