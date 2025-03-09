import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    userUpdate: builder.query({
      query: (uuid) => ({
        url: `/api/v1/users/${uuid}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useLazyUserUpdateQuery } = userApi;
